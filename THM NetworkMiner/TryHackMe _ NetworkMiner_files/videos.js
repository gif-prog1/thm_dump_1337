const videoId = '#room-video';
const videoEl = document.querySelector(videoId);

const simpleRoomVideoId = '#room-simple-video';

function renderRoomVideo(video) {
  if (video.canWatch) {
    if (video.source == 'THM') {
      renderCustomVid(video);
    } else {
      renderYouTubeVid(video);
    }
  } else {
    videoEl.innerHTML += `<div class="text-center bold text-danger">Subscribe to watch a walkthrough video. Otherwise, you can complete this room for free!</div>`;
  }
}

function renderYouTubeVid(video) {
  videoEl.innerHTML = `<div class="vertical-align-custom mb-1">
                         <div><span class='size-18 faded bold'>${
                           video.title
                         }</span> • <span class='size-14 faded'>${prettifyDate4(video.added)}</span></div>
                         <div class='size-10 faded float-right'>Source: YouTube</div>
                       </div>
                       <object id='yt-vid' width="100%" height="600px" data="${video.url}"></object>`;

  let ytVidConfig = { iframeMouseOver: false, eventSent: false }; // Allows us to identify if a user clicks inside the YouTube video iframe
  window.addEventListener('blur', function () {
    if (ytVidConfig.iframeMouseOver && !ytVidConfig.eventSent) {
      playVideoEvent(video.title);
      ytVidConfig.eventSent = false;
    }
  }); // log user watching video
  document.getElementById('yt-vid').addEventListener('mouseover', function () {
    ytVidConfig.iframeMouseOver = true;
  });
  document.getElementById('yt-vid').addEventListener('mouseout', function () {
    ytVidConfig.iframeMouseOver = false;
  });
}

function renderCustomVid(video) {
  let thumbnail = '';
  if (video.thumbnail && video.thumbnail.length > 0) {
    thumbnail = `poster="${video.thumbnail}"`;
  }
  videoEl.innerHTML = `
  <div class="vertical-align-custom mb-2">
  <div><span class='size-18 faded bold'>${video.title}</span> • <span class='size-14 faded'>${prettifyDate4(
    video.added
  )}</span></div>
  <div class='size-10 faded float-right'>Source: TryHackMe</div>
  </div>
    <video
      id="videojs-vid"
      class="video-js vjs-big-play-centered vjs-16-9"
      controls
      preload="metadata"
      ${thumbnail}
      data-setup="{}"
      >
      <source src="${video.url}" type="video/mp4" />
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
      </p>
      </video>
  `;

  const videoJS = videojs('#videojs-vid', {
    playbackRates: [0.5, 1, 1.5, 2],
  });
  //load markers
  videoJS.markers({
    markerStyle: {
      width: '12px',
      'background-color': '#8ee002',
    },
    markers: video.timestamps,
  });
  $(videoId).bind('contextmenu', function () {
    return false;
  });

  videoJS.on('click', function (evt) {
    if (evt.target.className == 'vjs-icon-placeholder' || evt.target.className == 'vjs-poster') {
      playVideoEvent(video.title);
    }
  });
}

function videoSimpleMove(autoOpen) {
  $(videoId).appendTo(simpleRoomVideoId);
  $('#sales-ad-card').appendTo(simpleRoomVideoId);
  if (autoOpen || autoOpen == undefined) $(simpleRoomVideoId).css('display', 'block');
}
