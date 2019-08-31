export const environment = {
  production: true,
  detailMessage: false,
  server_url: "real-server-url", //--prod 에서는 in memory db를 사용하지 않는다.
  apiUrls: [
    { key: 'heroes',        value: '' },
    { key: 'addHero',       value: '' },
    { key: 'deleteHero',    value: '' },
    { key: 'updateHero',    value: '' },
    { key: 'searchHeroName',  value: '' },

  ]
};
