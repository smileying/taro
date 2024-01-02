import Taro from '../../index'

declare module '../../index' {
  namespace requestPayment {
    interface Option {
      /** 时间戳，从 1970 年 1 月 1 日 00:00:00 至今的秒数，即当前的时间
       *  @supported weapp
       */
      timeStamp: string
      /** 随机字符串，长度为32个字符以下
       *  @supported weapp
       */
      nonceStr: string
      /** 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
       * @supported weapp, qq
       */
      package: string
      /** 签名算法
       *  @supported weapp
       */
      signType?: keyof SignType
      /** 签名，具体签名方案参见 [小程序支付接口文档](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=3)
       *  @supported weapp
       */
      paySign: string
      /** 商户号
       * @supported qq
       */
      bargainor_id?: string
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用失败的回调函数 */
      fail?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用成功的回调函数 */
      success?: (res: TaroGeneral.CallbackResult) => void
    }

    interface SignType {
      /** 仅在微信支付 v2 版本接口适用 */
      MD5
      /** 仅在微信支付 v2 版本接口适用 */
      'HMAC-SHA256'
      /** 仅在微信支付 v3 版本接口适用 */
      RSA
    }
  }

  namespace requestVirtualPayment {
    interface Option {
      /** 具体支付参数见signData, 该参数需以string形式传递
       * signData: '{"offerId":"123","buyQuantity":1,"env":0,"currencyType":"CNY","productId":"testproductId","goodsPrice":10,"outTradeNo":"xxxxxx","attach":"testdata"}'
       */
      signData: SignData
      /** 支付的类型, 不同的支付类型有各自额外要传的附加参数 */
      mode: keyof Mode
      /** 支付签名, 详见《[签名详解](https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/virtual-payment.html)》 */
      paySig: string
      /** 用户态签名, 详见《[签名详解](https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/virtual-payment.html)》 */
      signature: string
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用失败的回调函数 */
      fail?: (res: FailCallbackResult) => void
      /** 接口调用成功的回调函数 */
      success?: (res: TaroGeneral.CallbackResult) => void
    }
    interface SignData {
      /** 在米大师侧申请的应用 id, mp-支付基础配置中的offerid */
      offerId: string
      /** 购买数量 */
      buyQuantity: number
      /** 环境配置, 0 米大师正式环境, 1 米大师沙箱环境, 默认为 0 */
      env?: number
      /** 币种 */
      currencyType: keyof CurrencyType
      /** 道具ID, **该字段仅mode=short_series_goods时需要必填** */
      productId?: string
      /** 道具单价(分), **该字段仅mode=short_series_goods时需要必填**, 用来校验价格与后台道具价格是否一致, 避免用户在业务商城页看到的价格与实际价格不一致导致投诉 */
      goodsPrice?: number
      /** 业务订单号, 每个订单号只能使用一次, 重复使用会失败(极端情况不保证唯一, 不建议业务强依赖唯一性). 要求8-32个字符内, 只能是数字、大小写字母、符号 _-|*@组成, 不能以下划线(_)开头 */
      outTradeNo: string
      /** 透传数据, 发货通知时会透传给开发者 */
      attach: string
    }
    interface CurrencyType {
      /** 人民币 */
      CNY
    }
    interface Mode {
      /** 	道具直购 */
      short_series_goods
      /** 代币充值 */
      short_series_coin
    }
    interface FailCallbackResult extends TaroGeneral.CallbackResult {
      errCode: keyof VirtualPaymentErrCode
    }
    interface VirtualPaymentErrCode {
      /** 支付失败 */
      [-1]
      /** 支付取消 */
      [-2]
      /** 风控拦截 */
      [-4]
      /** 开通签约结果未知 */
      [-5]
      /** 参数错误,具体原因见err_msg */
      [-15001]
      /** outTradeNo重复使用,请换新单号重试 */
      [-15002]
      /** 系统错误 */
      [-15003]
      /** currencyType错误,目前只能填CNY */
      [-15004]
      /** 用户态签名signature错误 */
      [-15005]
      /** 支付签名paySig错误 */
      [-15006]
      /** session_key过期 */
      [-15007]
      /** 二级商户进件未完成 */
      [-15008]
      /** 代币未发布 */
      [-15009]
      /** 道具productId未发布 */
      [-15010]
      /** 现网版本的env只能是0,不能填1(沙盒环境) */
      [-15011]
      /** 调用米大师失败导致关单,请换新单号重试 */
      [-15012]
      /** goodsPrice道具价格错误 */
      [-15013]
      /** 道具/代币发布未生效，禁止下单，大概10分钟后生效 */
      [-15014]
      /** signData格式有问题 */
      [-15016]
      /** 此商家涉嫌违规，收款功能已被限制，暂无法支付。商家可以登录微信商户平台/微信支付商家助手小程序查看原因和解决方案 */
      [-15017]
      /** 代币或者道具productId审核不通过 */
      [-15018]
      /** 调微信报商户受限,商家可以登录微信商户平台/微信支付商家助手小程序查看原因和解决方案 */
      [-15019]
      /** 操作过快，请稍候再试 */
      [-15020]
    }
  }

  namespace requestPluginPayment {
    interface Option {
      /** 插件版本 */
      version: keyof Version
      /** 需要显示在页面中的金额，单位为分 */
      fee: number
      /** 任意数据，传递给功能页中的响应函数 */
      paymentArgs: Object
      /** 需要显示在页面中的货币符号的代码
       * @default CNY
       */
      currencyType?: string
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用失败的回调函数 */
      fail?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用成功的回调函数 */
      success?: (res: TaroGeneral.CallbackResult) => void
    }
    interface Version {
      /** 开发版 */
      develop
      /** 体验版 */
      trial
      /** 正式版 */
      release
    }
  }

  namespace requestMerchantTransfer {
    interface Option {
      /** 商户号 */
      mchId: string
      /** 子商户号，服务商模式下必填 */
      subMchId?: string
      /** 商户 appId，普通模式下必填，服务商模式下，appId 和 subAppId 二选一填写 */
      appId?: string
      /** 子商户 appId，服务商模式下，appId 和 subAppId 二选一填写 */
      subAppId?: string
      /** 商家转账付款单跳转收款页 pkg 信息,商家转账付款单受理成功时返回给商户 */
      package: string
      /** 收款用户 openId， 对应传入的商户 appId 下，某用户的 openId */
      openId?: string
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用失败的回调函数 */
      fail?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用成功的回调函数 */
      success?: (res: TaroGeneral.CallbackResult) => void
   }
  }

  namespace requestCommonPayment {
    interface Option {
      /** 支付的类型 */
      mode: keyof Mode
      /** 具体支付参数
       *  该参数需以string形式传递, 例如signData: '{"mchid":"1234567890","out_trade_no":"test1244","description":"测试测试","amount":{"order_amount":1,"currency":"CNY"},"attach":"test_attach","env":1}'
       */
      signData: ISignData
      /**
       * 支付签名, 详见《[签名详解](https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/virtual-payment.html)》
       */
      paySig: string
      /**
       * 用户态签名, 详见《[签名详解](https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/virtual-payment.html)》
       */
      signature: string
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用失败的回调函数 */
      fail?: (res: FailCallbackResult) => void
      /** 接口调用成功的回调函数 */
      success?: (res: TaroGeneral.CallbackResult) => void
    }
    interface Mode {
      /** B2b支付 */
      retail_pay_goods
    }
    interface ISignData {
      /** 由微信支付生成并下发的商户号。示例值：1230000109 */
      mchid: string
      /** 商户系统内部订单号，只能是数字、大小写字母_-*且在同一个商户号下唯一，长度限制为[6,32]。示例值：1217752501201407033233368018 */
      out_trade_no: string
      /** 商品描述。示例值：Image形象店-深圳腾大-QQ公仔 */
      description: string
      /** 订单金额信息。 */
      amount?: keyof IAmount
      /** 附加数据，在查询API和支付通知中原样返回，可作为自定义参数使用，实际情况下只有支付完成状态才会返回该字段。示例值：test_attach */
      attach?: string
      /** 订单详细商品信息列表。 */
      product_info?: IProduceInfo
      /** 配送方式。示例值：2 */
      delivery_type?: keyof DeliveryType
      /** 下单环境。示例值：0 */
      env: keyof Env
    }
    interface IAmount {
      /** 订单所有商品的原价总和，单位为分。示例值：1000 */
      product_amount?: number
      /** 订单运费，单位为分。示例值：200 */
      freight?: number
      /** 订单总计优惠金额，单位为分。示例值：500 */
      discount?: number
      /** 订单其他费用总金额，单位为分。示例值：600 */
      other_fee?: number
      /** 订单总需支付金额，也即是真正下单总金额，单位为分。示例值：1300 */
      order_amount: number
      /** 货币类型。示例值：CNY */
      currency?: keyof Currency
    }
    interface Currency {
      CNY
    }

    interface IProduceInfo {
      /** 商户系统内该商品的spuid。示例值：spu123456 */
      spu_id: string
      /** 商户系统内该商品的skuid。示例值：sku123 */
      sku_id: string
      /** 商品标题。示例值：QQ长鹅 */
      title: string
      /** 商户商品详请页小程序路径。示例值：pages/index */
      path: string
      /** 商品主图的url，大小建议64*64。示例值：https://mp.weixin.qq.com/123 */
      head_img: string
      /** 商户侧该商品所属的类目。示例值：玩偶 */
      category: string
      /** 商户系统内该商品的sku属性。示例值：50cm */
      sku_attr: string
      /** 该商品原价，单位为分。示例值：5000 */
      org_price: number
      /** 该商品售价，单位为分。示例值：4000 */
      sale_price: number
      /** 用户购买该商品的数量。示例值：5 */
      quantity: number
    }
    interface DeliveryType {
      /** 同城配送 */
      1
      /** 快递配送 */
      2
      /** 门店自提 */
      3
      /** 无需配送与提货 */
      4
    }
    interface Env {
      /** 生产环境/现网环境 */
      0
      /** 沙箱环境/测试环境 */
      1
    }
    interface FailCallbackResult extends TaroGeneral.CallbackResult {
      errno: keyof RequestCommonPaymentErrCode
    }
    interface RequestCommonPaymentErrCode {
      /** 系统错误 */
      1000
      /** 参数json格式非法 */
      1022
      /** 参数错误，具体原因见errMsg */
      702001
      /** 用户态签名错误 */
      702002
      /** 支付签名错误 */
      702003
      /** mode不合法 */
      702004
      /** out_trade_no重复，请更换新单号重试 */
      702005
      /** 二级商户进件未完成 */
      702006
      /** 用户未授权给品牌 */
      702007
      /** 正式版小程序只能用生产环境下单 */
      702008
    }
  }

  namespace requestOrderPayment {
    interface Option {
      /** 时间戳，从 1970 年 1 月 1 日 00:00:00 至今的秒数，即当前的时间 */
      timeStamp: string
      /** 随机字符串，长度为32个字符以下 */
      nonceStr: string
      /** 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*** */
      package: string
      /** 订单信息，仅在需要校验的场景下需要传递，具体见[接口说明](https://developers.weixin.qq.com/miniprogram/dev/framework/ministore/minishopopencomponent2/API/order/requestOrderPayment) */
      orderInfo?: Object
      /** 外部 APP 用户 ID */
      extUserUin?: string
      /** 签名算法 */
      signType?: keyof SignType
      /** 签名，具体签名方案参见 [小程序支付接口文档](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=3) */
      paySign: string
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用失败的回调函数 */
      fail?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用成功的回调函数 */
      success?: (res: TaroGeneral.CallbackResult) => void
    }

    interface SignType {
      /** 仅在微信支付 v2 版本接口适用 */
      MD5
      /** 仅在微信支付 v2 版本接口适用 */
      'HMAC-SHA256'
      /** 仅在微信支付 v3 版本接口适用 */
      RSA
    }
  }

  interface TaroStatic {
    /** 发起微信支付。了解更多信息，请查看[微信支付接口文档](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1)
     * @supported weapp, qq
     * @example
     * ```tsx
     * Taro.requestPayment({
     *   timeStamp: '',
     *   nonceStr: '',
     *   package: '',
     *   signType: 'MD5',
     *   paySign: '',
     *   success: function (res) { },
     *   fail: function (res) { }
     * })
     * ```
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestPayment.html
     */
    requestPayment(option: requestPayment.Option): Promise<TaroGeneral.CallbackResult>

    /** 发起米大师虚拟支付
     * @supported weapp
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestVirtualPayment.html 
     */
    requestVirtualPayment(option: requestVirtualPayment.Option): void

    /** 插件中发起支付。
     * @supported weapp
     * @example
     * ```tsx
     * Taro.requestPluginPayment({
     *   version: 'release',
     *   fee: 1,
     *   paymentArgs: {},
     *   currencyType: 'CNY',
     *   success (res) { },
     *   fail (res) { }
     * })
     * ```
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestPluginPayment.html
     */
    requestPluginPayment(option: requestPluginPayment.Option): void

    /** 商家转账用户确认模式下，在微信客户端通过小程序拉起页面请求用户确认收款。调用前需在微信支付商户平台/合作伙伴平台-产品中心，申请开通商家转账。
     * @supported weapp
     * @example
     * ```tsx
     * Taro.requestMerchantTransfer({
     *   mchId: '',
     *   subMchId: '',
     *   appId: '',
     *   subAppId: '',
     *   package: '',
     *   openId: '',
     *   success (res) { },
     *   fail (res) { }
     * })
     * ```
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestMerchantTransfer.html
     */
    requestMerchantTransfer(option: requestMerchantTransfer.Option): void

    /** 发起通用支付。目前该接口仅支持 B2b 支付类型。
     * @supported weapp
     * @example
     * ```tsx
     * Taro.requestCommonPayment({
     *   signData: JSON.stringify({
     *     mchid: '1234567890',
     *     out_trade_no: 'test1244',
     *     description: '测试测试',
     *     amount: {
     *        order_amount: 1,
     *        currency: 'CNY'
     *     },
     *     attach: 'test_attach',
     *     product_info: {
     *       product_list: [{
     *         spu_id: 'spu123456',
     *         sku_id: 'sku123',
     *         title: 'QQ长鹅',
     *         path: 'pages/index',
     *         head_img: 'https://mp.weixin.qq.com/123',
     *         category: '玩偶',
     *         sku_attr: '50cm',
     *         org_price: 5000,
     *         sale_price: 4000,
     *         quantity: 5
     *       }]
     *     },
     *     delivery_type: 2,
     *     env: 0
     *   }),
     *   paySig: 'd0b8bbccbe109b11549bcfd6602b08711f46600965253a949cd6a2b895152f9d',
     *   signature: 'd0b8bbccbe109b11549bcfd6602b08711f46600965253a949cd6a2b895152f9d',
     *   mode: 'retail_pay_goods',
     *   success(res) {
     *     console.log('requestCommonPayment success', res)
     *   },
     *   fail({ errMsg, errno }) {
     *     console.error(errMsg, errno)
     *   },
     * })
     * ```
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestCommonPayment.html
     */
    requestCommonPayment(option: requestCommonPayment.Option): void

    /** 创建自定义版交易组件订单，并发起支付。 仅接入了[自定义版交易组件](https://developers.weixin.qq.com/miniprogram/dev/framework/ministore/minishopopencomponent2/Introduction2)的小程序需要使用，普通小程序可直接使用 `Taro.requestPayment`。
     * @supported weapp
     * @example
     * 除 orderInfo 以外，其余字段与 [Taro.requestPayment](./requestPayment) 一致
     *
     * ```tsx
     * Taro.requestOrderPayment({
     *   orderInfo: {},
     *   timeStamp: '',
     *   nonceStr: '',
     *   package: '',
     *   signType: 'MD5',
     *   paySign: '',
     *   success (res) { },
     *   fail (res) { }
     * })
     * ```
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestOrderPayment.html
     */
    requestOrderPayment(option: requestOrderPayment.Option): Promise<TaroGeneral.CallbackResult>

    /** 支付各个安全场景验证人脸
     * @supported weapp
     * @deprecated
     * @example
     * ```tsx
     * Taro.faceVerifyForPay(params).then(...)
     * ```
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/open-api/payment/wx.faceVerifyForPay.html
     */
    faceVerifyForPay(option: any): Promise<any>
  }
}
