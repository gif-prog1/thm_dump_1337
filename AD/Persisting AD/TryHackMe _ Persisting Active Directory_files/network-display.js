const courseContentSec=document['querySelector']('#course-content'),startBtn=document['querySelector']('#start-network'),extendBtn=document['querySelector']('#extend-time'),resetBtn=document['querySelector']('#reset-network'),networkUpTimeEl=document['querySelector']('#network-uptime'),networkExpireEl=document['querySelector']('#time-left'),resetNoEl=document['querySelector']('#reset-no'),resetsReqEl=document['querySelector']('#resets-required'),networkStateEl=document['querySelector']('#network-state'),networkControlsNavEl=document['querySelector']('#network-controls'),networkBoxEl=document['querySelector']('#network-box'),certBtn=document['querySelector']('#room-cert'),messageEl=document['querySelector']('#messages');let extendTimer,networkUpTimer,networkConfig;async function initNetwork(_0x277e33){networkBoxEl['style']['display']='block',addNetworkBanner(),networkConfig=await getPublicNetworkConfig(_0x277e33);if(!networkConfig['outlineOnly']){networkStateControls(),networkControlsNavEl['style']['display']='flex';if(!networkConfig['tutorial'])startNetworkIntro();}else networkBoxEl['style']['borderBottomLeftRadius']='5px',networkBoxEl['style']['borderBottomRightRadius']='5px',networkBoxEl['style']['marginBottom']='15px';updateNetwork();}function updateNetwork(){const _0x309c9c=calcNetworkDiag(networkConfig);generateNetwork(_0x309c9c);}function addNetworkBanner(){}function setExtendTimer(_0x597e13,_0x54dd44){if(_0x597e13=='reset')networkExpireEl['textContent']='',clearInterval(extendTimer);else{const _0x4b6843=(new Date(_0x54dd44)['getTime']()-new Date()['getTime']())/0x3e8;clearInterval(extendTimer),extendTimer=setNetworkTimer(_0x4b6843,'time-left','extend');}}function setNetworkUpTimer(_0xac59b6,_0x18379b){if(_0xac59b6=='reset')networkUpTimeEl['textContent']='-',clearInterval(networkUpTimer);else{const _0x281e02=(new Date()['getTime']()-new Date(_0x18379b)['getTime']())/0x3e8;clearInterval(networkUpTimer),networkUpTimer=setNetworkTimer(_0x281e02,'network-uptime','uptime');}}function networkStateControls(){networkUpTimeEl['textContent']='-',networkExpireEl['textContent']='-',resetNoEl['textContent']=networkConfig['resets']['length']>=networkConfig['resetsRequired']?networkConfig['resetsRequired']-0x1:networkConfig['resets']['length'],resetsReqEl['textContent']=networkConfig['resetsRequired'];if(networkConfig['state']=='running')setNetworkUpTimer('set',networkConfig['lastBooted']),setExtendTimer('set',networkConfig['pauseTime']),extendBtn['disabled']=![],resetBtn['disabled']=![],networkStateEl['innerHTML']='Network\x20state:\x20<span\x20class=\x22text-success\x22>Running</span>';else{if(networkConfig['state']=='stopped')setExtendTimer('reset',null),setNetworkUpTimer('reset',null),startBtn['disabled']=![],networkExpireEl['textContent']='',networkStateEl['innerHTML']='Network\x20state:\x20<span\x20class=\x22text-danger\x22>Stopped</span>';else networkConfig['state']=='resetting'&&(setExtendTimer('reset',null),setNetworkUpTimer('reset',null),networkStateEl['innerHTML']='Network\x20state:\x20<span\x20class=\x22text-warning\x22>Resetting</span>');}}function networkLabelReplace(_0x18aedc){return _0x18aedc['replace'](/\\n/g,'\x0a');}function calcNetworkDiag(_0x14dbb0){let _0x472e6c=[];for(const _0x3015d2 of _0x14dbb0['nodes']){let _0x29837c=_0x3015d2['id'],_0x917d22=_0x3015d2['image'],_0x59460c=networkLabelReplace(_0x3015d2['label']);if(!_0x3015d2['showOnMap'])continue;for(const _0x9fcd7a of _0x3015d2['change']){if(_0x9fcd7a['active']&&_0x9fcd7a['taskNo']&&_0x9fcd7a['questionNo']){const _0xd6f296=taskData['filter'](_0x224e47=>_0x224e47['taskNo']==_0x9fcd7a['taskNo']);if(_0xd6f296['length']>0x0){const _0x110da5=determineCorrect(_0x9fcd7a['questionNo'],_0xd6f296[0x0]);_0x110da5&&(_0x917d22=_0x9fcd7a['image'],_0x59460c=networkLabelReplace(_0x9fcd7a['label']));}}}const _0x984cd6={'id':_0x29837c,'shape':'image','image':_0x917d22,'label':_0x59460c};_0x3015d2['level']!=null&&(_0x984cd6['level']=_0x3015d2['level']||''),_0x472e6c['push'](_0x984cd6);}return{'nodes':_0x472e6c,'edges':_0x14dbb0['connections']};}function determineCorrect(_0xf40df6,_0x402c5a){for(const _0x534194 of _0x402c5a['tasksInfo']){if(_0x534194['questionNo']==_0xf40df6)return _0x534194['correct']?!![]:![];}return![];}function getPublicNetworkConfig(_0x314c82){return new Promise((_0x3ce1ab,_0x59070e)=>{$['getJSON']('/network/get-network-config?roomId='+_0x314c82,async function(_0x4ebf17){return _0x3ce1ab(_0x4ebf17);});});}