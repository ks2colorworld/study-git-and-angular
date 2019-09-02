import { Injectable } from '@angular/core';
import { Hero } from "./hero";
import { Observable, of } from "rxjs";
import { delay, catchError, map, tap, filter } from "rxjs/operators";
import { MessageService } from "./message.service";
import { environment as env } from "../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // 참고 : 서버에 요청할 heroesUrl을 :base/:collectionName과 같이 정의
  // 이 문자열에서 base는 요청으로 보내는 주소의 기본 위치를 의미
  // collectionName은 in-memory-data.service.ts에 있는 히어로 데이터가 저장되는 위치
  // collectionName > createDb()에서 반환하는 개체이름과 동일
  // createDb()에서 return {a,b,c, ...} 으로 여러개를 반환할 수 있다.
  // :base 이름은 in-memory-data.service를 사용할 때는 의미 없음.(api)
  // createDb() >> return {heroes, heroes2}
  // 실전 코드로 아래 리펙토링 >> private heroesUrl = 'api/heroes2'; // 웹 API 형식의 URL로 사용
  private heroesUrl(key:string): string{
    const apiUrl = env.apiUrls.find(u => u.key === key);
    if(env.detailMessage){
    console.log('apiUrl key : ' + key );
    console.log(apiUrl);
    }
    return apiUrl? apiUrl.value : 'api/error';
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl('heroes'))
      .pipe(
        //* api로 넘어온 데이터를 조작 후 리턴하는 샘플 작성
        map(heroes => {
          heroes.push({id:100, name:'ks lee'});
          return heroes;
        }),
        //*/
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** Promise 테스트 코드, 존재하지 않으면 404 반환함.*/
  getHeroForPromise(id:number): Promise<Hero>{
    const url = `${this.heroesUrl('heroes')}/${id}`;
    return this.http.get(url,{})
      .toPromise()
      .then();
  }

  getHeroForPromiseThen(hero:Hero): Hero {
    hero.name += " for promise then";
    return hero;
  }

   /** GET: id에 해당하는 히어로 데이터 가져오기. 존재하지 않으면 404를 반환합니다. */
  getHero(id: number, No404?: boolean): Observable<Hero> {
    if(No404){
      return this.getHeroNo404<Hero>(id).pipe(
        //* 404 혹은 undefined 반환 대신 다르게 반환하는 예시 작성해 봄.
        map(hero => {
          if(hero) {return hero;}
          const NoHero: Hero=new Hero;
          NoHero.id = 404; NoHero.name = 'unknown';
          return NoHero;
        }),
        //*/
      );
    }

    const url = `${this.heroesUrl('heroes')}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** GET: id에 해당하는 히어로 데이터를 가져옵니다. 존재하지 않으면 `undefined`를 반환합니다. <Data> : 어떤 역활?? */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl("heroes")}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), //배열에 있는 항목 중 하나만 반환함.
        tap(h => {
          const outcome = h ? `fetched`:`did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /* 상단코드
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
   */
  addHero(hero: Hero): Observable<Hero>{
    if(env.detailMessage)
    console.log(hero);
    return this.http.post<Hero>(this.heroesUrl('addHero'), hero, httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      )
  }

  /** PUT: 서버에 저장된 히어로 데이터를 변경합니다. */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl('updateHero'), hero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  /**
    제거할 히어로의 id는 URL을 구성할 때 사용됩니다.
    put이나 post을 사용했을 때와는 다르게, 추가 데이터는 보내지 않습니다.
    httpOptions는 동일한 방식으로 사용합니다.
   */
  deleteHero(hero:Hero | number): Observable<Hero>{
    const id = typeof hero === 'number' ? hero: hero.id; //타입 확인방법
    const url = `${this.heroesUrl('deleteHero')}/${id}`;

    return this.http.delete<Hero>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      )
  }

  searchHeroes(term: string): Observable<Hero[]>{
    if (!term.trim()) {
      // 빈 배열 반환.
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl('searchHeroName')}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  /**
   * HTTP 요청이 실패한 경우를 처리합니다.
   * 애플리케이션 로직 흐름은 그대로 유지됩니다.
   * @param operation - 실패한 동작의 이름
   * @param result - 기본값으로 반환할 객체
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: 리모트 서버로 에러 메시지 보내기
      if(env.detailMessage)
      console.error(error); // 지금은 콘솔에 로그를 출력합니다.

      // TODO: 사용자가 이해할 수 있는 형태로 변환하기
      this.log(`${operation} failed: ${error.message}`);

      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
      return of(result as T);
    };
  }

  private log(message: string) {
    if (env.detailMessage)
      this.messageService.add(`HeroService: ${message}`);
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }
}
