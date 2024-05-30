import styled, { DefaultTheme } from 'styled-components'
import { space, typography, layout } from 'styled-system'

const Text = styled.div`
  color: #fff;
  ${space}
  ${typography}
  ${layout}
  pointer-events: auto;
`

export default Text
