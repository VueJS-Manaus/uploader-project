<template>
  <div class="uploader-body">
    <div class="container">
      <div class="row uploaded-file">
        <div class="col col-sm-4">
          <div class="card">
            <div class="card-body">
                <div class="uploaded-file__button d-flex flex-wrap justify-content-around">
                  <h3>Upload Files</h3>
                  <input type="file" style="display: none;" ref="fileInput" @change="loadFile">
                  <button class="btn btn-info d-flex" @click="onPickFile">
                    Upload Files
                    <div class="loader ml-2" v-if="loading"></div>
                  </button>
                  <!-- <div class="loader"></div> -->
                </div>
            </div>
          </div>
        </div>
        <div class="col col-sm-8">
          <div class="card">
            <div class="card-body">
              <div class="uploaded-file__list">
                  <h3>Files Uploaded</h3>
                  <ul class="list-group">
                    <li v-for="file in allFiles" :key="file.id" class="list-group-item d-flex justify-content-between">
                      <p>{{file.name}}</p>
                      <a :href="file.urlUploaded" download>Download</a>
                      <!-- <a :href="file.urlUploaded" download>
                        <img :src="file.urlUploaded" class="img-uploaded">
                      </a> -->
                    </li>
                  </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      file: [],
      arquivo: null
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    allFiles () {
      return this.$store.getters.allFiles
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    },
    loadFile (event) {
      let file = event.target.files
      this.$store.dispatch('loadFiles', file[0])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .uploader-body {
    padding-top: 70px;
  }

  .uploaded-file {
    display: flex;
    /* justify-content: space-around; */
  }

  .card {
    padding: 5px;
    margin-bottom: 10px;
    /* min-width: 290px; */
  }

  .img-uploaded {
    width: 150px;
    height: 150px;
  }

  /* Loader */

  .loader {
    border: 2px solid #f3f3f3;
    border-top: 2px solid #17a2b8;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }
</style>
