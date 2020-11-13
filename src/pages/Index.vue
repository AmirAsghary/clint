<template>
    <div >
        <div id="back" style="background-color: #000000"></div>
        <div id="front" style="background-color: #000b17"></div>

        <div class="q-pt-md items-center justify-between" style="height: 90vh">
            <div class="">
                <q-carousel
                        v-model="hubContent.slide"
                        transition-prev="slide-right"
                        transition-next="slide-left"
                        animated
                        control-color="primary"
                        class="rounded-borders q-mx-lg q-mt-xs"
                        height="300px"
                        style="background-color: rgba(0,0,0,0.31)"
                >
                    <q-carousel-slide name="style" class="column no-wrap flex-center">
                        test
                    </q-carousel-slide>
                    <q-carousel-slide name="tv" class="column no-wrap flex-center">
                        lick my balls
                    </q-carousel-slide>
                    <q-carousel-slide name="layers" class="column no-wrap flex-center">
                        <q-icon name="layers" color="primary" size="56px" />
                        <div class="q-mt-md text-center">
                            asda############sadasd
                        </div>
                    </q-carousel-slide>
                    <q-carousel-slide name="map" class="column no-wrap flex-center">
                        <q-icon name="terrain" color="primary" size="56px" />
                        <div class="q-mt-md text-center">
                            asd&&&&&&&&&&&&&asdasdasd
                        </div>
                    </q-carousel-slide>
                </q-carousel>
            </div>

            <div class="=">
                <!--            <av-media-->
                <!--                    style="position: relative; left: 20px;"-->
                <!--                    :frequ-line-cap="true" :frequ-lnum="500" :line-width="1"-->
                <!--                    :media="media"-->
                <!--                    type="frequ"-->
                <!--                    line-color="#fcba03"-->
                <!--            />-->
                <q-btn
                        round
                        color="transparent"
                        size="30px"
                        icon="mic"
                        style="left: 40%"
                        class="q-mt-md"
                />
            </div>
        </div>

        <q-page-sticky :offset="[18, 18]" :position="$i18n.locale==='fa-ir' ? 'bottom-left':'bottom-right'">
            <q-btn :ripple="false" @click="setting.show=true" dense fab padding="xs" round unelevated>
                <q-icon color="grey-6" name="settings" size="20px"/>
            </q-btn>
        </q-page-sticky>

        <q-dialog v-model="setting.show">
            <q-card class="q-px-sm q-pb-md bg-grey-1" style="width: 300px">
                <q-card-section>
                    <div :class="$i18n.locale==='fa-ir' ? 'farsi-font':'title-font'" class="text-h6" dir="auto">
                        {{$t('settings.title')}}
                    </div>
                </q-card-section>

                <q-select
                        :class="$i18n.locale==='fa-ir' ? 'farsi-font':'title-font'"
                        :color="$q.dark.isActive ? 'grey-4' : ''"
                        :label="$t('settings.language.title')"
                        :options="setting.langOptions"
                        borderless
                        class="q-px-sm"
                        emit-value
                        map-options
                        style="min-width: 150px"
                        v-model="setting.lang"
                />
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
    const {ipcRenderer} = require('electron');

    import Vue from 'vue'
    import AudioVisual from 'vue-audio-visual'
    import axios from 'axios'
    import JDate from 'jalali-date'
    import store from '../store/store.js'

    Vue.use(AudioVisual)
    class MainContent {

        static showWeather() {
            let now = new Date()

            const lat = 37.203876;
            const lon = 50.010472;
            const key = 'd504c6a52ce451923d4d70ed8c5f92cc'

            axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
                .then(function (response) {
                    // handle success
                    console.log(response.data.main.temp);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }

        static showNews() {
            const key = '7fba8b8bfc9a456aadec450561654520'

            axios.get(`https://newsapi.org/v2/top-headlines?country=gb&category=sports&api${key}`)
                .then(function (response) {
                    // handle success
                    console.log(response.data.response.results);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }

        static sayWelcome() {

        }

        static getTime() {
            const jdate = new JDate();

            console.log(jdate.format('dddd DD MMMM YYYY'))
        }
    }

    export default {
        name: 'MainHub',
        data() {
            return {
                media: null,
                setting:{
                    show: false,
                    lang: this.$i18n.locale,
                    langOptions: [
                        {value: 'en-us', label: 'English'},
                        {label: 'Farsi', value: 'fa-ir'}
                    ]
                },
                hubContent:{
                    slide:'tv',
                    date:{
                        time: null,
                        day: null
                    },
                    entertainment:{
                        joke: null,
                        welcome: null
                    },
                    news:{
                        articles: null
                    }
                }
            }
        },
        methods: {

        },
        mounted() {
            console.log(store.state.dick + store.state.times)
            store.dispatch('increment', 10)
            console.log(store.state.dick + store.state.times)

            const constraints = { audio: true, video: false }
            navigator.mediaDevices.getUserMedia(constraints).
            then(media => {
                this.media = media
                this.$refs.player.srcObject = media
            })

            ipcRenderer.on('login-page', (event, message) => {
                console.log('login-page received : ' + message)
                switch (message.header.type) {
                    default:
                        console.log('!NOT APPLICABLE! : ' + message)
                        break;
                }
            })
        }
    }
</script>

<style>
    a:link {
        text-decoration: none;
    }

    a:visited {
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    a:active {
        text-decoration: underline;
    }

    @keyframes backgroundAnimate {
        from {
            left: 0;
            top: 0;
        }
        to {
            left: -10000px;
            top: -2000px;
        }
    }

    #back {
        background: url(http://www.tranexnet.com/img/back.png) repeat 20% 20%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.4;
        z-index: -1;
        -webkit-animation-name: backgroundAnimate;
        -webkit-animation-duration: 500s;
        -webkit-animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-name: backgroundAnimate;
        -moz-animation-duration: 5s;
        -moz-animation-timing-function: linear;
        -moz-animation-iteration-count: infinite;
        -o-animation-name: backgroundAnimate;
        -o-animation-duration: 500s;
        -o-animation-timing-function: linear;
        -o-animation-iteration-count: infinite;
        animation-name: backgroundAnimate;
        animation-duration: 500s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }

    #front {
        background: url(http://www.tranexnet.com/img/front.png) repeat 35% 35%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.6;
        z-index: -1;
        -webkit-animation-name: backgroundAnimate;
        -webkit-animation-duration: 300s;
        -webkit-animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-name: backgroundAnimate;
        -moz-animation-duration: 300s;
        -moz-animation-timing-function: linear;
        -moz-animation-iteration-count: infinite;
        -o-animation-name: backgroundAnimate;
        -o-animation-duration: 300s;
        -o-animation-timing-function: linear;
        -o-animation-iteration-count: infinite;
        animation-name: backgroundAnimate;
        animation-duration: 300s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }
</style>
