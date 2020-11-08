<template>
  <q-layout class="shadow-2 rounded-borders">
    <q-header>
      <q-bar class="q-electron-drag bg-dark">

        <q-space/>

        <q-btn @click="minimize" dense flat icon="minimize"/>
        <q-btn @click="closeApp" dense flat icon="close"/>
      </q-bar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
  const {ipcRenderer} = require('electron');

  export default {
    name: 'MainLayout',

    data() {
      return {

      }
    },
    mounted() {
      ipcRenderer.on('login-layout', (event, message) => {
        console.log('login-layout received : ' + message)
        switch (message.header.type) {
          default:
            console.log('!NOT APPLICABLE! : ' + message)
            break;
        }
      })
    },
    methods: {
      minimize() {
        if (process.env.MODE === 'electron') {
          // this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
          let req = {
            header: {type: 'page-state'},
            payload: {state: 'minimize'}
          }
          ipcRenderer.send('window-manager', req)
        }
      },
      closeApp() {
        if (process.env.MODE === 'electron') {
          // this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
          let req = {
            header: {type: 'page-state'},
            payload: {state: 'close'}
          }
          ipcRenderer.send('window-manager', req)
        }
      },
    }
  }
</script>

<style>
  body {
    overflow: hidden;
  }
</style>
