/**
 * Created by Narasingh on 10/3/2015.
 */
(function(){
    'use strict';

    function movCommonApi($http, CONFIG, $sessionStorage, $localStorage, $rootScope, $q){

        var baseUrl = CONFIG.baseUrl;
        var commonObj = {
            keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
            setConfiguration : function(){
                //avoid api call every time on page load
                if(!$localStorage.imageInfo){
                    $http.get(baseUrl + 'configuration').then(this.setImageInfo);
                }
            },
            setSessionId : function(){
                //call only if session id is not in session storage
                if(!this.getSessionId()) {
                  return  $http.get(baseUrl + 'authentication/guest_session/new').then(this.setToken);
                }
            },
            getSessionId : function(){
               return $sessionStorage.$default().session_id || $sessionStorage.$default().guest_session_id || null;
            },
            generateNewSession : function(){
                //generate new session
                var self = this;
                var data = this.getToken();
                var defer = $q.defer();

                $http.get(baseUrl + '/authentication/session/new', { params : data }).then(function(response){
                    self.setToken(response);
                    defer.resolve(response);
                })
                .catch(function(error){
                    defer.reject(error);
                });
                return defer.promise;
            },
            generateGuestSession : function(){
                //generate new session
                return $http.get(baseUrl + '/authentication/guest_session/new');
            },
            generateAuthToken : function(){

                var self = this,
                    tokenObj = self.getToken(),
                    exp = tokenObj.expires_at,
                    match = exp && exp.match(/^(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\:(\d+)$/) || [],
                    expireTime = match.length && new Date(match[1], match[2] - 1, match[3], match[4], match[5], match[6]),
                    utcTime = expireTime && Math.floor(expireTime.getTime()/1000) || Date.now(),
                    now = Date.now()/1000;
                var defer = $q.defer();

                if(tokenObj.request_token && ((utcTime - now) < (60)) || !tokenObj.request_token){
                    $http.get(baseUrl + 'authentication/token/new', {}).then(function(response){

                        self.setToken(response);
                        defer.resolve({ request_token : response.data.request_token });
                    }).catch(function(error){
                        defer.reject(error);
                    });
                }else{
                    defer.resolve(tokenObj);
                }

                return defer.promise;

            },
            getAuthTokenWithLogin : function(data){

                return $http.get(baseUrl + 'authentication/token/validate_with_login', { params : data })
                    .then(this.registerTokenWithLogin.bind(this))
                    .catch(function(error){
                        return error;
                    });
            },
            getToken : function(){
                var tokenObj = $sessionStorage.$default();
                return {
                    request_token: tokenObj.request_token || null,
                    expires_at: tokenObj.request_expires_at && tokenObj.request_expires_at.replace(' UTC', '') || null
                };

            },
            registerTokenWithLogin : function(response){

                var self = this;

                if(typeof response ==='object' && response.status === 200){
                    $sessionStorage.$default({
                        request_token : self.base64Encode(response.data.request_token),
                        userInfo : 'MOV' + response.data.request_token
                    });
                }
                //return status 200 or error
                return response.status;

            },
            setToken : function(response){
                if(typeof response ==='object' && response.data.request_token){
                    $sessionStorage.$default({
                        request_token : response.data.request_token,
                        request_expires_at : response.data.expires_at
                    });
                }else if(response.data.session_id){
                    $sessionStorage.$default({
                        session_id : response.data.session_id
                    });
                }
            },
            setImageInfo : function(response){

                $rootScope.$storage = $localStorage.$default({
                    imageInfo: JSON.stringify(response.data)
                });
            },
            getImageInfo : function(){
                var imageInfo = $localStorage.imageInfo && JSON.parse($localStorage.imageInfo) || {};
                return imageInfo.images;
            },
            getValueByKey : function(array, code){

                if(array.length){

                    var properties = { name : ''};

                    angular.forEach(array , function(obj){
                         if(obj.code === code){
                             properties = obj;
                         }
                    });

                    return properties;

                }
                return false;
            },
            languageList : function(){
                return  [
                    {
                        'code': 'ab',
                        'name': 'Abkhaz'
                    },
                    {
                        'code': 'aa',
                        'name': 'Afar'
                    },
                    {
                        'code': 'af',
                        'name': 'Afrikaans'
                    },
                    {
                        'code': 'ak',
                        'name': 'Akan'
                    },
                    {
                        'code': 'sq',
                        'name': 'Albanian'
                    },
                    {
                        'code': 'am',
                        'name': 'Amharic'
                    },
                    {
                        'code': 'ar',
                        'name': 'Arabic'
                    },
                    {
                        'code': 'an',
                        'name': 'Aragonese'
                    },
                    {
                        'code': 'hy',
                        'name': 'Armenian'
                    },
                    {
                        'code': 'as',
                        'name': 'Assamese'
                    },
                    {
                        'code': 'av',
                        'name': 'Avaric'
                    },
                    {
                        'code': 'ae',
                        'name': 'Avestan'
                    },
                    {
                        'code': 'ay',
                        'name': 'Aymara'
                    },
                    {
                        'code': 'az',
                        'name': 'Azerbaijani'
                    },
                    {
                        'code': 'bm',
                        'name': 'Bambara'
                    },
                    {
                        'code': 'ba',
                        'name': 'Bashkir'
                    },
                    {
                        'code': 'eu',
                        'name': 'Basque'
                    },
                    {
                        'code': 'be',
                        'name': 'Belarusian'
                    },
                    {
                        'code': 'bn',
                        'name': 'Bengali; Bangla'
                    },
                    {
                        'code': 'bh',
                        'name': 'Bihari'
                    },
                    {
                        'code': 'bi',
                        'name': 'Bislama'
                    },
                    {
                        'code': 'bs',
                        'name': 'Bosnian'
                    },
                    {
                        'code': 'br',
                        'name': 'Breton'
                    },
                    {
                        'code': 'bg',
                        'name': 'Bulgarian'
                    },
                    {
                        'code': 'my',
                        'name': 'Burmese'
                    },
                    {
                        'code': 'ca',
                        'name': 'Catalan; Valencian'
                    },
                    {
                        'code': 'ch',
                        'name': 'Chamorro'
                    },
                    {
                        'code': 'ce',
                        'name': 'Chechen'
                    },
                    {
                        'code': 'ny',
                        'name': 'Chichewa; Chewa; Nyanja'
                    },
                    {
                        'code': 'zh',
                        'name': 'Chinese'
                    },
                    {
                        'code': 'cv',
                        'name': 'Chuvash'
                    },
                    {
                        'code': 'kw',
                        'name': 'Cornish'
                    },
                    {
                        'code': 'co',
                        'name': 'Corsican'
                    },
                    {
                        'code': 'cr',
                        'name': 'Cree'
                    },
                    {
                        'code': 'hr',
                        'name': 'Croatian'
                    },
                    {
                        'code': 'cs',
                        'name': 'Czech'
                    },
                    {
                        'code': 'da',
                        'name': 'Danish'
                    },
                    {
                        'code': 'dv',
                        'name': 'Divehi; Dhivehi; Maldivian;'
                    },
                    {
                        'code': 'nl',
                        'name': 'Dutch'
                    },
                    {
                        'code': 'dz',
                        'name': 'Dzongkha'
                    },
                    {
                        'code': 'en',
                        'name': 'English'
                    },
                    {
                        'code': 'eo',
                        'name': 'Esperanto'
                    },
                    {
                        'code': 'et',
                        'name': 'Estonian'
                    },
                    {
                        'code': 'ee',
                        'name': 'Ewe'
                    },
                    {
                        'code': 'fo',
                        'name': 'Faroese'
                    },
                    {
                        'code': 'fj',
                        'name': 'Fijian'
                    },
                    {
                        'code': 'fi',
                        'name': 'Finnish'
                    },
                    {
                        'code': 'fr',
                        'name': 'French'
                    },
                    {
                        'code': 'ff',
                        'name': 'Fula; Fulah; Pulaar; Pular'
                    },
                    {
                        'code': 'gl',
                        'name': 'Galician'
                    },
                    {
                        'code': 'ka',
                        'name': 'Georgian'
                    },
                    {
                        'code': 'de',
                        'name': 'German'
                    },
                    {
                        'code': 'el',
                        'name': 'Greek, Modern'
                    },
                    {
                        'code': 'gn',
                        'name': 'Guaran'
                    },
                    {
                        'code': 'gu',
                        'name': 'Gujarati'
                    },
                    {
                        'code': 'ht',
                        'name': 'Haitian; Haitian Creole'
                    },
                    {
                        'code': 'ha',
                        'name': 'Hausa'
                    },
                    {
                        'code': 'he',
                        'name': 'Hebrew (modern)'
                    },
                    {
                        'code': 'hz',
                        'name': 'Herero'
                    },
                    {
                        'code': 'hi',
                        'name': 'Hindi'
                    },
                    {
                        'code': 'ho',
                        'name': 'Hiri Motu'
                    },
                    {
                        'code': 'hu',
                        'name': 'Hungarian'
                    },
                    {
                        'code': 'ia',
                        'name': 'Interlingua'
                    },
                    {
                        'code': 'id',
                        'name': 'Indonesian'
                    },
                    {
                        'code': 'ie',
                        'name': 'Interlingue'
                    },
                    {
                        'code': 'ga',
                        'name': 'Irish'
                    },
                    {
                        'code': 'ig',
                        'name': 'Igbo'
                    },
                    {
                        'code': 'ik',
                        'name': 'Inupiaq'
                    },
                    {
                        'code': 'io',
                        'name': 'Ido'
                    },
                    {
                        'code': 'is',
                        'name': 'Icelandic'
                    },
                    {
                        'code': 'it',
                        'name': 'Italian'
                    },
                    {
                        'code': 'iu',
                        'name': 'Inuktitut'
                    },
                    {
                        'code': 'ja',
                        'name': 'Japanese'
                    },
                    {
                        'code': 'jv',
                        'name': 'Javanese'
                    },
                    {
                        'code': 'kl',
                        'name': 'Kalaallisut, Greenlandic'
                    },
                    {
                        'code': 'kn',
                        'name': 'Kannada'
                    },
                    {
                        'code': 'kr',
                        'name': 'Kanuri'
                    },
                    {
                        'code': 'ks',
                        'name': 'Kashmiri'
                    },
                    {
                        'code': 'kk',
                        'name': 'Kazakh'
                    },
                    {
                        'code': 'km',
                        'name': 'Khmer'
                    },
                    {
                        'code': 'ki',
                        'name': 'Kikuyu, Gikuyu'
                    },
                    {
                        'code': 'rw',
                        'name': 'Kinyarwanda'
                    },
                    {
                        'code': 'ky',
                        'name': 'Kyrgyz'
                    },
                    {
                        'code': 'kv',
                        'name': 'Komi'
                    },
                    {
                        'code': 'kg',
                        'name': 'Kongo'
                    },
                    {
                        'code': 'ko',
                        'name': 'Korean'
                    },
                    {
                        'code': 'ku',
                        'name': 'Kurdish'
                    },
                    {
                        'code': 'kj',
                        'name': 'Kwanyama, Kuanyama'
                    },
                    {
                        'code': 'la',
                        'name': 'Latin'
                    },
                    {
                        'code': 'lb',
                        'name': 'Luxembourgish, Letzeburgesch'
                    },
                    {
                        'code': 'lg',
                        'name': 'Ganda'
                    },
                    {
                        'code': 'li',
                        'name': 'Limburgish, Limburgan, Limburger'
                    },
                    {
                        'code': 'ln',
                        'name': 'Lingala'
                    },
                    {
                        'code': 'lo',
                        'name': 'Lao'
                    },
                    {
                        'code': 'lt',
                        'name': 'Lithuanian'
                    },
                    {
                        'code': 'lu',
                        'name': 'Luba-Katanga'
                    },
                    {
                        'code': 'lv',
                        'name': 'Latvian'
                    },
                    {
                        'code': 'gv',
                        'name': 'Manx'
                    },
                    {
                        'code': 'mk',
                        'name': 'Macedonian'
                    },
                    {
                        'code': 'mg',
                        'name': 'Malagasy'
                    },
                    {
                        'code': 'ms',
                        'name': 'Malay'
                    },
                    {
                        'code': 'ml',
                        'name': 'Malayalam'
                    },
                    {
                        'code': 'mt',
                        'name': 'Maltese'
                    },
                    {
                        'code': 'mi',
                        'name': 'MÄori'
                    },
                    {
                        'code': 'mr',
                        'name': 'Marathi'
                    },
                    {
                        'code': 'mh',
                        'name': 'Marshallese'
                    },
                    {
                        'code': 'mn',
                        'name': 'Mongolian'
                    },
                    {
                        'code': 'na',
                        'name': 'Nauru'
                    },
                    {
                        'code': 'nv',
                        'name': 'Navajo, Navaho'
                    },
                    {
                        'code': 'nb',
                        'name': 'Norwegian BokmÃ¥l'
                    },
                    {
                        'code': 'nd',
                        'name': 'North Ndebele'
                    },
                    {
                        'code': 'ne',
                        'name': 'Nepali'
                    },
                    {
                        'code': 'ng',
                        'name': 'Ndonga'
                    },
                    {
                        'code': 'nn',
                        'name': 'Norwegian Nynorsk'
                    },
                    {
                        'code': 'no',
                        'name': 'Norwegian'
                    },
                    {
                        'code': 'ii',
                        'name': 'Nuosu'
                    },
                    {
                        'code': 'nr',
                        'name': 'South Ndebele'
                    },
                    {
                        'code': 'oc',
                        'name': 'Occitan'
                    },
                    {
                        'code': 'oj',
                        'name': 'Ojibwe, Ojibwa'
                    },
                    {
                        'code': 'cu',
                        'name': 'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic'
                    },
                    {
                        'code': 'om',
                        'name': 'Oromo'
                    },
                    {
                        'code': 'or',
                        'name': 'Oriya'
                    },
                    {
                        'code': 'os',
                        'name': 'Ossetian, Ossetic'
                    },
                    {
                        'code': 'pa',
                        'name': 'Panjabi, Punjabi'
                    },
                    {
                        'code': 'pi',
                        'name': 'PÄli'
                    },
                    {
                        'code': 'fa',
                        'name': 'Persian (Farsi)'
                    },
                    {
                        'code': 'pl',
                        'name': 'Polish'
                    },
                    {
                        'code': 'ps',
                        'name': 'Pashto, Pushto'
                    },
                    {
                        'code': 'pt',
                        'name': 'Portuguese'
                    },
                    {
                        'code': 'qu',
                        'name': 'Quechua'
                    },
                    {
                        'code': 'rm',
                        'name': 'Romansh'
                    },
                    {
                        'code': 'rn',
                        'name': 'Kirundi'
                    },
                    {
                        'code': 'ro',
                        'name': 'Romanian, [])'
                    },
                    {
                        'code': 'ru',
                        'name': 'Russian'
                    },
                    {
                        'code': 'sa',
                        'name': 'Sanskrit (Saá¹ská¹›ta)'
                    },
                    {
                        'code': 'sc',
                        'name': 'Sardinian'
                    },
                    {
                        'code': 'sd',
                        'name': 'Sindhi'
                    },
                    {
                        'code': 'se',
                        'name': 'Northern Sami'
                    },
                    {
                        'code': 'sm',
                        'name': 'Samoan'
                    },
                    {
                        'code': 'sg',
                        'name': 'Sango'
                    },
                    {
                        'code': 'sr',
                        'name': 'Serbian'
                    },
                    {
                        'code': 'gd',
                        'name': 'Scottish Gaelic; Gaelic'
                    },
                    {
                        'code': 'sn',
                        'name': 'Shona'
                    },
                    {
                        'code': 'si',
                        'name': 'Sinhala, Sinhalese'
                    },
                    {
                        'code': 'sk',
                        'name': 'Slovak'
                    },
                    {
                        'code': 'sl',
                        'name': 'Slovene'
                    },
                    {
                        'code': 'so',
                        'name': 'Somali'
                    },
                    {
                        'code': 'st',
                        'name': 'Southern Sotho'
                    },
                    {
                        'code': 'az',
                        'name': 'South Azerbaijani'
                    },
                    {
                        'code': 'es',
                        'name': 'Spanish; Castilian'
                    },
                    {
                        'code': 'su',
                        'name': 'Sundanese'
                    },
                    {
                        'code': 'sw',
                        'name': 'Swahili'
                    },
                    {
                        'code': 'ss',
                        'name': 'Swati'
                    },
                    {
                        'code': 'sv',
                        'name': 'Swedish'
                    },
                    {
                        'code': 'ta',
                        'name': 'Tamil'
                    },
                    {
                        'code': 'te',
                        'name': 'Telugu'
                    },
                    {
                        'code': 'tg',
                        'name': 'Tajik'
                    },
                    {
                        'code': 'th',
                        'name': 'Thai'
                    },
                    {
                        'code': 'ti',
                        'name': 'Tigrinya'
                    },
                    {
                        'code': 'bo',
                        'name': 'Tibetan Standard, Tibetan, Central'
                    },
                    {
                        'code': 'tk',
                        'name': 'Turkmen'
                    },
                    {
                        'code': 'tl',
                        'name': 'Tagalog'
                    },
                    {
                        'code': 'tn',
                        'name': 'Tswana'
                    },
                    {
                        'code': 'to',
                        'name': 'Tonga (Tonga Islands)'
                    },
                    {
                        'code': 'tr',
                        'name': 'Turkish'
                    },
                    {
                        'code': 'ts',
                        'name': 'Tsonga'
                    },
                    {
                        'code': 'tt',
                        'name': 'Tatar'
                    },
                    {
                        'code': 'tw',
                        'name': 'Twi'
                    },
                    {
                        'code': 'ty',
                        'name': 'Tahitian'
                    },
                    {
                        'code': 'ug',
                        'name': 'Uyghur, Uighur'
                    },
                    {
                        'code': 'uk',
                        'name': 'Ukrainian'
                    },
                    {
                        'code': 'ur',
                        'name': 'Urdu'
                    },
                    {
                        'code': 'uz',
                        'name': 'Uzbek'
                    },
                    {
                        'code': 've',
                        'name': 'Venda'
                    },
                    {
                        'code': 'vi',
                        'name': 'Vietnamese'
                    },
                    {
                        'code': 'vo',
                        'name': 'VolapÃ¼k'
                    },
                    {
                        'code': 'wa',
                        'name': 'Walloon'
                    },
                    {
                        'code': 'cy',
                        'name': 'Welsh'
                    },
                    {
                        'code': 'wo',
                        'name': 'Wolof'
                    },
                    {
                        'code': 'fy',
                        'name': 'Western Frisian'
                    },
                    {
                        'code': 'xh',
                        'name': 'Xhosa'
                    },
                    {
                        'code': 'yi',
                        'name': 'Yiddish'
                    },
                    {
                        'code': 'yo',
                        'name': 'Yoruba'
                    },
                    {
                        'code': 'za',
                        'name': 'Zhuang, Chuang'
                    },
                    {
                        'code': 'zu',
                        'name': 'Zulu'
                    }
                ];
            },
            base64Encode : function(input){

                var self = this;
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        self.keyStr.charAt(enc1) +
                        self.keyStr.charAt(enc2) +
                        self.keyStr.charAt(enc3) +
                        self.keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },
            base64Decode : function(input){
                var self = this;
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    window.alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = self.keyStr.indexOf(input.charAt(i++));
                    enc2 = self.keyStr.indexOf(input.charAt(i++));
                    enc3 = self.keyStr.indexOf(input.charAt(i++));
                    enc4 = self.keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }

        };

        return commonObj;
    }

    movCommonApi.$inject = ['$http', 'CONFIG', '$sessionStorage', '$localStorage', '$rootScope', '$q'];
    angular.module('mov.common',[]).factory('movCommonApi', movCommonApi);
}());
