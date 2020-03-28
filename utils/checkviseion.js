// 检测新版本，自动更新
const checkVieson = () => {
  // 判断微信版本是否兼容该检测版本Api
  if (wx.canIUse("getUpdateManager")) {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 检测是否有新版本
      if (res.hasUpdate) {
        //下载新版本
        updateManager.onUpdateReady(function (res) {
          // 新版本下载成功，重启(自动)更新
          updateManager.applyUpdate()
        })
        // 下载新版本失败
        updateManager.onUpdateFailed(function () {
          wx.showModal({
            title: '提示',
            content: '新版本下载失败，请稍后再试',
          })
        })
      }
    })
  } else {
    wx.showModal({
      title: '提示',
      content: '微信版本过低，请更新最新微信版本',
    })
  }

}

module.exports = {
  checkVieson
}