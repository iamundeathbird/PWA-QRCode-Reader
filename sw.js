// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = 'leader-qr-scanner-caches';
var urlsToCache = [
    './',
    './sw.js',
    './css/styles.css',
    './css/modal.css',
    './js/app.js',
    './js/codeprocess.js',
    './js/build/alignpat.js',
    './js/build/bmparser.js',
    './js/build/databr.js',
    './js/build/decoder.js',
    './js/build/errorlevel.js',
    './js/build/formatinf.js',
    './js/build/gf256poly.js',
    './js/build/qcode-decoder.min.js',
    './js/build/qrcode.js',
    './js/build/rsdecoder.js',
    './js/build/bitmat.js',
    './js/build/datablock.js',
    './js/build/datamask.js',
    './js/build/detector.js',
    './js/build/findpat.js',
    './js/build/gf256.js',
    './js/build/grid.js', 
    './js/build/qcode-decoder.min.js.map',
    './js/build/qrcode.js.map',
    './js/build/version.js',

];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});
