import { ThemeProvider } from 'styled-components';
import { Catalog } from './Catalog';
import { GlobalStyle } from './GlobalStyle';
import { useTheme } from './useTheme';

export default function App() {
  const { name, theme, toggle } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Catalog themeName={name} onToggleTheme={toggle} />
    </ThemeProvider>
  );
}
