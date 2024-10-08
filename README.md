# 项目文档
[飞书文档](https://d15wjftdz9o.feishu.cn/docx/XmJhd2WY6oXpdAxDZkUcVkw6ngF)

可能会用到的UI库

[ColorUI](https://github.com/XiaokangLei/ColorUI-GA?tab=readme-ov-file)

云开发实例id 
hongjie-cloud-9gyqypgh4799cf8a

以下为模板文档（先放着）：

# 报名工具 ｜ 云开发Cloudbase模版

## 项目介绍

本项目是一个实用的报名应用，可以DIY自己的信息，支持报名和审核。

项目涉及到的云开发知识包含云函数，整体学习较为简单，如果你想更改报名表单的内容，可以直接在 `page/index.js` 中按照对应说明修改。

另外在项目逻辑代码中编写了详细的注释说明，非常适合初入门开发者学习和参考开发。

## 部署步骤

- 在左上角点击【云开发】按钮，进入云开发控制台。
- 如果没有环境则按照提示开通云开发环境
- 进入云开发环境，在【设置】页复制`环境ID`
- 右键点击 `cloudfunctions/quickstartFunctions` 文件夹，选择云函数云端安装依赖上传
- 如果在新建项目时，小程序下有云开发环境，则会默认注入第一个环境，如果想更换为自己想要的环境，只需要将 `miniprogram/envList.js` 文件里的内容全部替换成如下，注意替换envId

``` js
module.exports = {
  envList: [{
    envId:'上述步骤中你获得的环境ID'
  }]
}
```

- 第一次访问时，会创建默认活动（quickstartFunctions/data/project.js），你可以前往数据库添加“openid”为你自己，就可以在报名列表页面管理了。
- 你可以在 `mp_register_project` 中创建多个活动，在小程序端以`pages/index/index?id=XXX`的形式访问。
- 自己的活动图片可以上传保存在云存储中，或者静态资源存储中，拒绝盗用其他人的图片链接。