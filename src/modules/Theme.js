import Utils from '../utils/Utils'

/**
 * ApexCharts Theme Class for setting the colors and palettes.
 *
 * @module Theme
 **/

class Theme {
  constructor (ctx) {
    this.ctx = ctx
    this.w = ctx.w
    this.colors = []
  }

  init () {
    this.setDefaultColors()
  }

  setDefaultColors () {
    let w = this.w
    let utils = new Utils()

    if (w.config.colors === undefined) {
      w.config.colors = this.predefined()
    }

    const defaultColors = w.config.colors.slice()

    if (w.config.theme.monochrome.enabled) {
      let monoArr = []
      let glsCnt = w.globals.series.length
      if (w.config.plotOptions.bar.distributed && w.config.chart.type === 'bar') {
        glsCnt = w.globals.series[0].length * w.globals.series.length
      }

      let mainColor = w.config.theme.monochrome.color
      let part = 1 / (glsCnt / w.config.theme.monochrome.shadeIntensity)
      let shade = w.config.theme.monochrome.shadeTo
      let percent = 0

      for (let gsl = 0; gsl < glsCnt; gsl++) {
        let newColor = mainColor

        if (shade === 'dark') {
          newColor = utils.shadeColor(percent * -1, mainColor)
          percent = percent + part
        } else {
          newColor = utils.shadeColor(percent, mainColor)
          percent = percent + part
        }

        monoArr.push(newColor)
      }
      w.config.colors = monoArr.slice()
    }

    // if user specfied less colors than no. of series, push the same colors again
    this.pushExtraColors(w.config.colors)

    // The Border colors
    if (w.config.stroke.colors === undefined) {
      w.config.stroke.colors = defaultColors
    } else {
      this.pushExtraColors(w.config.stroke.colors)
    }

    // The FILL colors
    if (w.config.fill.colors === undefined) {
      w.config.fill.colors = w.config.colors
    } else {
      this.pushExtraColors(w.config.fill.colors)
    }

    if (w.config.dataLabels.style.colors === undefined) {
      w.config.dataLabels.style.colors = defaultColors
    } else {
      this.pushExtraColors(w.config.dataLabels.style.colors)
    }

    // The point colors
    if (w.config.markers.colors === undefined) {
      w.config.markers.colors = defaultColors
    } else {
      this.pushExtraColors(w.config.markers.colors)
    }
  }

  // When the number of colors provided is less than the number of series, this method
  // will push same colors to the list
  // params:
  // distributed is only valid for distributed column/bar charts
  pushExtraColors (colorSeries, distributed = null) {
    let w = this.w

    let len = w.globals.series.length

    if (distributed === null) {
      distributed = w.config.chart.type === 'bar' && w.config.plotOptions.bar.distributed
    } else {
      distributed = false
    }

    if (distributed) {
      len = w.globals.series[0].length * w.globals.series.length
    }

    if (colorSeries.length < len) {
      let diff = len - colorSeries.length
      for (let i = 0; i < diff; i++) {
        colorSeries.push(colorSeries[i])
      }
    }
  }

  predefined () {
    let palette = this.w.config.theme.palette
    // D6E3F8, FCEFEF, DCE0D9, A5978B, EDDDD4, D6E3F8, FEF5EF
    switch (palette) {
      case 'palette1':
        this.colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']
        break
      case 'palette2':
        this.colors = ['#3f51b5', '#03a9f4', '#4caf50', '#f9ce1d', '#FF9800']
        break
      case 'palette3':
        this.colors = ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B']
        break
      case 'palette4':
        this.colors = ['#546E7A', '#4ecdc4', '#c7f464', '#81D4FA', '#fd6a6a']
        break
      case 'palette5':
        this.colors = ['#2b908f', '#f9a3a4', '#90ee7e', '#fa4443', '#69d2e7']
        break
      case 'palette6':
        this.colors = ['#449DD1', '#F86624', '#EA3546', '#662E9B', '#C5D86D']
        break
      case 'palette7':
        this.colors = ['#D7263D', '#1B998B', '#2E294E', '#F46036', '#C5D86D']
        break
      case 'palette8':
        this.colors = ['#662E9B', '#F86624', '#F9C80E', '#EA3546', '#43BCCD']
        break
      case 'palette9':
        this.colors = ['#5fba7d', '#f48024', '#8884d8', '#c34459', '#f9ee45']
        break
      case 'palette10':
        this.colors = ['#5C4742', '#A5978B', '#8D5B4C', '#5A2A27', '#C4BBAF']
        break
      case 'palette11':
        this.colors = ['#A300D6', '#7D02EB', '#5653FE', '#2983FF', '#00B1F2']
        break
      default:
        this.colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']
        break
    }
    return this.colors
  }
}

module.exports = Theme
