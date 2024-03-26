import VaIcon from './components/va-icon'
import iconsConfig from './icons-config/icons-config'
// import { COLOR_THEMES } from './themes'

export default {
  // colors: {
  //   presets: {
  //     original: {
  //       ...COLOR_THEMES[3].colors,
  //     },
  //   },
  // },
  colors: {
    variables: {
      primary: 'rgba(28,141,141,0.87)',
      textPrimary: 'rgb(53,52,54)',
    },
  },
  icons: iconsConfig,
  breakpoint: {
    enabled: true,
    bodyClass: true,
    thresholds: {
      xs: 0,
      sm: 320,
      md: 640,
      lg: 1024,
      xl: 1440,
    },
  },
  components: {
    VaIcon,
    VaButton: {
      round: true,
    },
    presets: {
      VaButton: {
        outline: {
          backgroundOpacity: 0,
          hoverBehaviour: 'opacity',
          hoverOpacity: 0.07,
          pressedBehaviour: 'opacity',
          pressedOpacity: 0.13,
        },
        plain: {
          round: false,
          plain: true,
          hoverBehaviour: 'mask',
          hoverOpacity: 0.15,
          pressedBehaviour: 'mask',
          pressedOpacity: 0.13,
        },
      },
    },
  },
}
