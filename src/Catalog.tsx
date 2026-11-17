import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Badge } from './components/Badge';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Grid } from './components/Grid';
import { Input } from './components/Input';
import { CATEGORIES, PRODUCTS, formatPrice, type Product } from './data/products';
import type { ThemeName } from './theme';

const Page = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(4)};
  padding: ${({ theme }) => theme.space(4)} ${({ theme }) => theme.space(6)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1)};
`;

const Title = styled.h1`
  margin: 0;
  font-size: 22px;
`;

const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(4)};
  max-width: 1120px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space(6)};
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(4)};
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(2)};
`;

const Emoji = styled.div`
  font-size: 40px;
  line-height: 1;
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(2)};
`;

const ProductTitle = styled.h2`
  margin: 0;
  font-size: 18px;
`;

const Meta = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(3)};
  margin-top: auto;
`;

const Price = styled.strong`
  font-size: 18px;
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space(3)};
  padding: ${({ theme }) => theme.space(8)};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.muted};
`;

interface CatalogProps {
  themeName: ThemeName;
  onToggleTheme: () => void;
}

export function Catalog({ themeName, onToggleTheme }: CatalogProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('Все');
  const [cart, setCart] = useState<number[]>([]);
  const [pendingId, setPendingId] = useState<number | null>(null);

  const products = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCategory = category === 'Все' || product.category === category;
      const matchesQuery = normalized.length === 0 || product.title.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const addToCart = (id: number) => {
    setPendingId(id);
    window.setTimeout(() => {
      setCart((current) => (current.includes(id) ? current : [...current, id]));
      setPendingId((current) => (current === id ? null : current));
    }, 700);
  };

  const reset = () => {
    setQuery('');
    setCategory('Все');
  };

  return (
    <Page>
      <Header>
        <Brand>
          <Title>Мини-маркет</Title>
          <Subtitle>Каталог с поиском и темами</Subtitle>
        </Brand>
        <HeaderActions>
          <Badge tone="neutral">В корзине: {cart.length}</Badge>
          <Button variant="ghost" size="sm" onClick={onToggleTheme}>
            {themeName === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
          </Button>
        </HeaderActions>
      </Header>
      <Main>
        <Toolbar>
          <Input
            label="Поиск"
            id="search"
            name="search"
            type="search"
            placeholder="Название товара"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Filters role="group" aria-label="Категории">
            {['Все', ...CATEGORIES].map((item) => (
              <Button
                key={item}
                size="sm"
                variant={item === category ? 'primary' : 'ghost'}
                aria-pressed={item === category}
                onClick={() => setCategory(item)}
              >
                {item}
              </Button>
            ))}
          </Filters>
        </Toolbar>
        {products.length === 0 ? (
          <Empty>
            <strong>Ничего не найдено</strong>
            <span>Попробуйте другое название или сбросьте фильтр.</span>
            <Button variant="outline" size="sm" onClick={reset}>
              Сбросить
            </Button>
          </Empty>
        ) : (
          <Grid>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                inCart={cart.includes(product.id)}
                loading={pendingId === product.id}
                onAdd={addToCart}
              />
            ))}
          </Grid>
        )}
      </Main>
    </Page>
  );
}

function ProductCard({
  product,
  inCart,
  loading,
  onAdd,
}: {
  product: Product;
  inCart: boolean;
  loading: boolean;
  onAdd: (id: number) => void;
}) {
  return (
    <Card>
      <CardTop>
        <Emoji aria-hidden="true">{product.emoji}</Emoji>
        {product.isNew ? <Badge tone="accent">Новинка</Badge> : null}
      </CardTop>
      <ProductTitle>{product.title}</ProductTitle>
      <Meta>{product.category}</Meta>
      <Footer>
        <Price>{formatPrice(product.price)}</Price>
        <Button
          fullWidth
          variant={inCart ? 'outline' : 'primary'}
          loading={loading}
          disabled={inCart}
          onClick={() => onAdd(product.id)}
        >
          {inCart ? 'В корзине' : 'В корзину'}
        </Button>
      </Footer>
    </Card>
  );
}
