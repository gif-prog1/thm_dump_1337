const sendHeartbeat=async(_0x4ebdfa,_0x5f4f3c)=>{const _0x2836d1=new Headers();_0x2836d1['append']('Content-Type','application/json'),_0x2836d1['append']('CSRF-Token',csrfToken);const _0x53063c=btoa(JSON['stringify']({'value':_0x5f4f3c,'timestamp':Date['now'](),'roomCode':_0x4ebdfa})),_0x488896=JSON['stringify']({'payload':_0x53063c}),_0x472a98={'method':'POST','headers':_0x2836d1,'body':_0x488896,'redirect':'follow'};fetch('/heartbeat',_0x472a98)['catch'](console['error']);};setInterval(()=>{document['hasFocus']()&&errorCode===0x1&&!userCompletedRoom&&sendHeartbeat(roomCode,heartbeatInterval);},heartbeatInterval*0x3e8);