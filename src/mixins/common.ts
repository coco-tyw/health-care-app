import Vue from 'vue'
import {AxiosError} from 'axios'
import {ToastProgrammatic as Toast} from 'buefy'
import {removeAccessToken} from '@/plugins/token'


export default Vue.extend({
  methods: {
    async fillterApiError(err: AxiosError) {
      const codes = [err.code, `${err.response?.data.status}`, `${err.response?.status}`]
      const params = {message: '', type: 'is-danger', duration: 5000}
      if (codes.includes('401')) {
        removeAccessToken()
        params.message = 'サインアウトしました'
        params.type = 'is-warning'
        if ('/signIn' !== this.$route.path) {
          await this.$router.replace(`/signIn/?redirect=${encodeURIComponent(this.$route.fullPath)}`).catch(() => null)
        }
      } else if (codes.includes('404')) {
        params.message = 'リソースが見つかりませんでした'
      } else if (codes.includes('403')) {
        params.message = '許可されていない操作です'
      } else {
        params.message = `APIリクエストでエラーが発生しました [${err.response?.data.detail}]`
      }
      Toast.open(params)
      throw err
    }
  }
})
