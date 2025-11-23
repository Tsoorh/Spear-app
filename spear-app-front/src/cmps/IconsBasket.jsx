 import MenuIcon from '@mui/icons-material/Menu';


export function IconsBasket({ iconName }) {
  const normalized = iconName?.toLowerCase() || ''
  const icons = {
    menu: <MenuIcon/>,
  }

  return icons[normalized] || null
}
