const token: any = {
  light: {
    colorPrimary: '#1677ff',
    colorPrimaryBg: '#e6f4ff',
    colorBgContainer: '#fff',
    colorText: '#333333',
    colorTextDescription: '#333333CC',
    colorTextDisabled: '#33333380',
    colorTextPlaceholder: '#333333CC',
    colorBorderSecondary: '#f0f0f0',
    colorErrorOutline: '#FF26050F',
    // 以下为自定义颜色,需在对应组件上v-bind class样式
    textPrimary: '#333333',
    textSecondary: '#333333CC',
    textDisabled: '#33333380',
    iconDefault: '#333',
    iconActive: '#1677ff',
    layoutHeaderBg: '#fff',
    layoutContainerBg: '#f7f7f7',
    mainLayoutBg: '#fff',
    cardBackground: '#fff'
  },
  dark: {
    colorPrimary: '#1677ff',
    colorPrimaryBg: '#111a2c',
    colorBgContainer: '#242424',
    colorText: '#ffffff',
    colorTextDescription: '#ffffffCC',
    colorTextDisabled: '#ffffff80',
    colorTextPlaceholder: '#ffffffCC',
    colorBorderSecondary: '#303030',
    colorErrorOutline: '#FF26050F',
    colorBgElevated: '#424242',
    controlItemBgHover: '#333',
    // 以下为自定义颜色,需在对应组件上v-bind class样式
    textPrimary: '#ffffff',
    textSecondary: '#ffffffCC',
    textDisabled: '#ffffff80',
    iconDefault: '#ffffffcc',
    iconActive: '#1677ff',
    layoutHeaderBg: '#242424',
    layoutContainerBg: '#1a1a1a',
    mainLayoutBg: '#242424',
    cardBackground: '#424242'
  }
}

enum colorScheme { light = 'light', dark = 'dark' }

/**
 * @param mode light | dark
 * @param key Ant Design Vue's Design Token https://www.antdv.com/theme-editor-cn
 * @param value Hex Color | Rgb Color
 */
function modifyToken(mode: colorScheme, key: string, value: string) {
  token[mode][key] = value
}

export { token, modifyToken }