function generateNetwork(_0x4db881){const _0x2e0bb0=document['querySelector']('#network-display'),_0x3f61d2={'layout':{'hierarchical':{'direction':'UD','nodeSpacing':0x9b,'sortMethod':'directed'}},'nodes':{'borderWidth':0x0,'size':0x28,'color':{'border':'#222','background':'transparent'},'font':{'color':'#ffffff','face':'monospace','size':0xe,'strokeWidth':0x1,'strokeColor':'#222'}},'edges':{'color':{'color':'#CCC','highlight':'#A22'},'width':0x3,'length':0x12c,'hoverWidth':0.05},'physics':![],'interaction':{'hover':!![],'keyboard':{'enabled':![],'bindToWindow':![]},'navigationButtons':![],'zoomView':![]}},_0x189b25=new vis['Network'](_0x2e0bb0,_0x4db881,_0x3f61d2);_0x189b25['moveTo']({'position':{'x':0x0,'y':0xf}}),_0x189b25['on']('stabilizationIterationsDone',function(){_0x189b25['setOptions']({'physics':![]});}),_0x189b25['on']('click',function(_0x13d1ea){_0x13d1ea['event']='[original\x20event]',console['log']('click\x20event,\x20getNodeAt\x20returns:\x20'+this['getNodeAt'](_0x13d1ea['pointer']['DOM']));});}