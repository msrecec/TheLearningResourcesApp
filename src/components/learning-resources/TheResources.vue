<template>
  <base-card>
    <base-button
      @click="setSelectedTab('stored-resources')"
      :mode="storedResButtonMode"
      >Stored Resources</base-button
    >
    <base-button
      @click="setSelectedTab('add-resource')"
      :mode="addResButtonMode"
      >Add Resource</base-button
    >
  </base-card>
  <keep-alive>
    <component :is="selectedTab"></component>
  </keep-alive>
</template>

<script>
import StoredResources from './StoredResources.vue';
import AddResource from './AddResource.vue';
// import axios from 'axios';
import { request } from '../../datocms';

// const HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
//   allPosts(first: $limit) {
//     title
//   }
// }`;
// const HOMEPAGE_QUERY = `query allPosts($limit: IntType) {
//   allPosts(first: $limit) {
//     title,
//     content
//   }
// }`;
// const HOMEPAGE_QUERY = `query allPosts($limit: IntType) {
//   allPosts(first: $limit) {
//     title
//     content
//     id
//     date
//   }
// }`;
const HOMEPAGE_QUERY = `query allPosts($limit: IntType) {
  allPosts(first: $limit) {
    title
    content
    id
    date
  }
  upload(filter: {id: {eq: "4596019"}}) {
    url(imgixParams: {w:200, h:200, fit: crop})
  }
}`;

export default {
  components: {
    StoredResources,
    AddResource
  },
  async mounted() {
    // axios
    //   .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    //   .then(response => {
    //     const res = response.data.bpi;
    //     this.storedResources[0].title = res.USD.code;
    //     this.storedResources[0].description =
    //       res.USD.description + ': ' + res.USD.rate_float;
    //     this.storedResources[1].title = res.GBP.code;
    //     this.storedResources[1].description =
    //       res.GBP.description + ': ' + res.GBP.rate_float;
    //     this.storedResources[2].title = res.EUR.code;
    //     this.storedResources[2].description =
    //       res.EUR.description + ': ' + res.EUR.rate_float;
    //   }).then(() => {
    //   });
    // this.myGraphQL();

      try {
        this.data = await request({
          query: HOMEPAGE_QUERY,
          variables: {
            limit: 10
          }
        });
        this.storedResources.unshift({
          id: this.data.allPosts[0].id,
          title: this.data.allPosts[0].title,
          description: this.data.allPosts[0].content,
          link: this.data.allPosts[0].date,
          img: this.data.upload.url
        })
      } catch (e) {
        this.error = e;
      }

      this.loading = false;
      console.log(this.data.allPosts[0], this.loading);
      console.log(this.data.upload.url);
      // console.log(process.env.VUE_APP_CMS_DATOCMS_API_TOKEN);

  },
  data() {
    return {
      data: null,
      error: null,
      loading: true,
      selectedTab: 'stored-resources',
      storedResources: [
        {
          id: 'bitcoin-value',
          title: 'Bitcoin value',
          description: 'Bitcoin value',
          link: 'https://www.coindesk.com/'
        },
        {
          id: 'bitcoin-value',
          title: 'Bitcoin value',
          description: 'Bitcoin value',
          link: 'https://www.coindesk.com/'
        },
        {
          id: 'bitcoin-value',
          title: 'Bitcoin value',
          description: 'Bitcoin value',
          link: 'https://www.coindesk.com/'
        },
        {
          id: 'official-guide',
          title: 'Official Guide',
          description: 'The official Vue.js documentation',
          link: 'https://vuejs.org'
        },
        {
          id: 'google',
          title: 'Google',
          description: 'Learn to google...',
          link: 'https://google.com'
        }
      ]
    };
  },
  computed: {
    storedResButtonMode() {
      return this.selectedTab === 'stored-resources' ? null : 'flat';
    },
    addResButtonMode() {
      return this.selectedTab === 'add-resource' ? null : 'flat';
    }
  },
  provide() {
    return {
      resources: this.storedResources,
      addResource: this.addResource,
      deleteResource: this.removeResource
    };
  },
  methods: {
    async myGraphQL() {
      try {
        this.data = await request({
          query: HOMEPAGE_QUERY,
          // variables: {
          //   limit: 10
          // }
        });
      } catch (e) {
        this.error = e;
      }

      this.loading = false;
      console.log(this.data, this.loading);
    },
    setSelectedTab(tab) {
      this.selectedTab = tab;
    },
    addResource(title, description, url) {
      const newResource = {
        id: new Date().toISOString(),
        title: title,
        description: description,
        link: url
      };
      this.storedResources.unshift(newResource);
      this.selectedTab = 'stored-resources';
    },
    removeResource(resId) {
      const resIndex = this.storedResources.findIndex(res => res.id === resId);
      this.storedResources.splice(resIndex, 1);
    }
  }
};
</script>
