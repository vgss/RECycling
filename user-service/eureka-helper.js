const Eureka = require('eureka-js-client').Eureka;
const eurekaHost = (process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || 'discovery');
const eurekaPort = 8761;
const hostName = (process.env.HOSTNAME || 'localhost')
const ipAddr = '0.0.0.0';
 
exports.registerWithEureka = function(appName, PORT) {
  const client = new Eureka({
    instance: {
      app: appName,
      hostName: hostName,
      ipAddr: ipAddr,
      statusPageUrl: 'http://localhost:4000',
      vipAddress: appName,
      port: {
        $: PORT,
        '@enabled': 'true',
      },
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
      registerWithEureka: true,
      fetchRegistry: true,
    },
    eureka: {
      host: eurekaHost,
      port: eurekaPort,
      servicePath: '/eureka/apps/',
      maxRetries: 5,
      requestRetryDelay: 2000,
    },
  });

  var nodeInstance = '';

  client.start(error => {
    console.log(error || 'NodeJS Eureka Started!');
  
    nodeInstance = client.getInstancesByAppId('A-NODE-SERVICE');
    console.log(nodeInstance);

});
};