<template>
  <div class="avatar" :class="{complete: headerImage}" ref="avatar" :style="'width:'+ cube.width + 'px; height: '+ cube.height +'px; background: url('+ cube.backgroundImage +') no-repeat center/contain'">
    <input type="file" name="" id="avatar" class="avatar-file" accept="image/*" @change="uploadFile">
    <label class="avatar-label" for="avatar"></label>
  </div>
</template>
<script>

export default {
  name: 'avatar',
  data () {
    return {
      headerImage: '', // 展示头像
      avatarFile: '' // 头像
    }
  },
  props: {
    cube: {
      type: Object,
      default() {
        return { width: 64, height: 64, backgroundImage: '' }
      }
    }
  },
  methods: {
    // 上传文件
    uploadFile (e) {
      const file = e.target.files.length > 0 ? e.target.files[0] : null
      if (!this.imgCheck(file)) return
      let formData = new FormData()
      formData.append('imgFile', file)

      this.$api.uploadImg(formData).then(data => {
        this.headerImage = data
        this.postImg()
      }).catch((err) => console.log(err))
    },
    imgCheck(file) {
      if (file === null) return false
      const isIMAGE = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isIMAGE) {
        this.$toast.fail('上传文件只能是图片格式!')
        return false
      }
      if (!isLt1M) {
        this.$toast.fail('上传文件大小不能超过 1MB!')
        return false
      }
      return true
    },
    postImg () {
      this.$emit('upload', this.headerImage)
      this.$emit('input', this.headerImage)
      this.$refs.avatar.style.background = `url(${this.headerImage})no-repeat center/contain`
    }
  }
}
</script>

<style lang="stylus" scoped>
.avatar
  position relative
  // background url('../common/images/no_photo.jpg') no-repeat center/contain
  border-radius 50%
  &.complete .avatar-label
    top 0px
    left 0px
    width 100%
    height 100%

  .avatar-file
    display none

  .avatar-label
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    border-radius 50%
</style>
