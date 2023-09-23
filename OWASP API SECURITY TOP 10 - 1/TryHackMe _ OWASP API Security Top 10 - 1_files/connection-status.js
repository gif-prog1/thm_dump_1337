/*
    For the connection status on the room navbar
        - Uses room-mymachine.js file functions first to check if any attackbox machines are started.
            - If no machines, checks OpenVPN status
                - If OpenVPN down too, show as disconnected
                - If OpenVPN up, show as connected
            - If yes, show navbar connection status as "Connected"
*/

const navConnectionStatusEl = document.querySelector('#thm-connection-status');
const navConnectionStatusTxt = document.querySelector('#thm-connection-status-txt');

const navConnectionIPBtn = document.querySelector('#slideout-conn-hideip');
const slideoutConnStatus = document.querySelector('#slideout-conn-status');

function setNavConnStatus(json) {
  if (navConnectionStatusEl && !roomSettings.remAttackBoxBtn) {
    navConnectionStatusEl.style.display = 'flex';

    // Saves the IP for CONNECTION_IP.
    if (json.virtualIP) {
      connectionIP = json.virtualIP;
    } else {
      connectionIP = '';
    }

    if (json.type == 'attackbox') {
      setNavConnTxt(`${json.virtualIP}`);
      setSlideoutDetails({ type: 'attackbox', virtualIP: json.virtualIP });
      setNavConnStatusClass('thm-connected');
      hideIPBtnShow(true);
    } else if (json.type == 'webbased') {
      setNavConnTxt(`${json.virtualIP}`);
      setSlideoutDetails({ type: 'webbased', virtualIP: json.virtualIP });
      setNavConnStatusClass('thm-connected');
      hideIPBtnShow(true);
    } else if (json.type == 'openvpn') {
      setNavConnTxt(`${json.virtualIP}`);
      setSlideoutDetails({ type: 'openvpn', virtualIP: json.virtualIP });
      setNavConnStatusClass('thm-connected');
      hideIPBtnShow(true);
    } else if (json.type == 'hide') {
      navConnectionStatusEl.style.display = 'none';
    } else {
      setNavConnTxt('Access Machines');
      setSlideoutDetails({ type: 'disconnected' });
      setNavConnStatusClass('thm-disconnected');
      hideIPBtnShow(false);
    }
  }
}

function hideNavConnIP() {
  setNavConnTxt('Hidden');
  hideIPBtnShow(false);
}

function setNavConnTxt(text) {
  navConnectionStatusTxt.textContent = text;
}

function hideIPBtnShow(show) {
  if (show) {
    navConnectionIPBtn.style.display = 'block';
  } else {
    navConnectionIPBtn.style.display = 'none';
  }
}

function setSlideoutDetails(json) {
  if (json.type == 'disconnected') {
    slideoutConnStatus.innerHTML = `You are <span class='text-danger'>disconnected</span>`;
  } else if (json.type == 'openvpn') {
    slideoutConnStatus.innerHTML = `<p class='mb-0'>You are <span class='hacker-green'>connected</span> via OpenVPN</p><p class='size-16'>Your machines IP is <b>${json.virtualIP}<b></p>`;
  } else if (json.type == 'attackbox') {
    slideoutConnStatus.innerHTML = `<p class='mb-0'>You are <span class='hacker-green'>connected</span> via AttackBox</p><p class='size-16'>Your machines IP is <b>${json.virtualIP}<b></p>`;
  } else if (json.type == 'webbased') {
    slideoutConnStatus.innerHTML = `<p class='mb-0'>You are <span class='hacker-green'>connected</span></p><p class='size-16'>Your machines IP is <b>${json.virtualIP}<b></p>`;
  }
}

function setNavConnStatusClass(className) {
  navConnectionStatusEl.className = className;
}

// Is the user connected to an OpenVPN server?
function getNavConnOpenVPN() {
  return new Promise(function (resolve, reject) {
    $.getJSON('/vpn/my-data', async function (response) {
      if (response.virtualIP) {
        // if connected, show. Otherwise, show as disconnected.
        setNavConnStatus({ type: 'openvpn', virtualIP: response.virtualIP });
      } else {
        setNavConnStatus({ type: 'disconnected' });
      }
      return resolve();
    });
  });
}
