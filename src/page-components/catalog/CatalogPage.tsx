'use client';

import { useContactModal } from '@app/context/ContactModalContext';
import { products } from '@entities/product';
import { ContactModalForm } from '@features/contact-modal';
import { Button, Card } from '@shared/ui';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useMemo, useState } from 'react';
import styles from './Catalog.module.scss';

const ITEMS_PER_PAGE = 4;

type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'popular';

const CatalogPage: FC = () => {
  const router = useRouter();
  const { isOpen, closeModal } = useContactModal();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const [selectedFunctionality, setSelectedFunctionality] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [showOnlyPopular, setShowOnlyPopular] = useState(false);
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(true);
  // const [isColorsCollapsed, setIsColorsCollapsed] = useState(false);
  // const [isAttributesCollapsed, setIsAttributesCollapsed] = useState(false);
  // const [isFunctionalityCollapsed, setIsFunctionalityCollapsed] = useState(false);

  // Получаем все уникальные значения для фильтров
  // const allColors = useMemo(() => {
  //   const colorsSet = new Set<string>();
  //   products.forEach(product => {
  //     product.colors?.forEach(color => colorsSet.add(color));
  //   });
  //   return Array.from(colorsSet).sort();
  // }, []);

  // const allAttributes = useMemo(() => {
  //   const attrsSet = new Set<string>();
  //   products.forEach(product => {
  //     product.attributes?.forEach(attr => attrsSet.add(attr));
  //   });
  //   return Array.from(attrsSet).sort();
  // }, []);

  // const allFunctionality = useMemo(() => {
  //   const funcSet = new Set<string>();
  //   products.forEach(product => {
  //     product.functionality?.forEach(func => funcSet.add(func));
  //   });
  //   return Array.from(funcSet).sort();
  // }, []);

  const maxPrice = useMemo(() => {
    return Math.max(...products.map(p => p.priceValue || 0), 10000);
  }, []);

  // Инициализация диапазона цен
  useEffect(() => {
    if (maxPrice > 0) {
      setPriceRange([0, maxPrice]);
    }
  }, [maxPrice]);

  // Фильтрация продуктов
  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      // Поиск по имени
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Фильтр по популярности
      if (showOnlyPopular && !product.popular) {
        return false;
      }

      // Фильтр по цене
      const productPrice = product.priceValue || 0;
      if (productPrice < priceRange[0] || productPrice > priceRange[1]) {
        return false;
      }

      // Фильтр по цветам
      if (selectedColors.length > 0) {
        const hasColor = selectedColors.some(color =>
          product.colors?.includes(color)
        );
        if (!hasColor) return false;
      }

      // Фильтр по атрибутам
      if (selectedAttributes.length > 0) {
        const hasAttribute = selectedAttributes.some(attr =>
          product.attributes?.includes(attr)
        );
        if (!hasAttribute) return false;
      }

      // Фильтр по функционалу
      if (selectedFunctionality.length > 0) {
        const hasFunc = selectedFunctionality.some(func =>
          product.functionality?.includes(func)
        );
        if (!hasFunc) return false;
      }

      return true;
    });

    // Сортировка
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (a.priceValue || 0) - (b.priceValue || 0);
        case 'price-desc':
          return (b.priceValue || 0) - (a.priceValue || 0);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'popular':
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return 0;
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, selectedColors, selectedAttributes, selectedFunctionality, priceRange, sortBy, showOnlyPopular]);

  const displayedProducts = filteredProducts.slice(0, displayedCount);
  const hasMore = filteredProducts.length > displayedCount;

  const handleViewDetails = (index: number) => {
    router.push(`/product/${index}`);
  };

  const handleShowMore = () => {
    setDisplayedCount(prev => prev + ITEMS_PER_PAGE);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedColors([]);
    setSelectedAttributes([]);
    setSelectedFunctionality([]);
    setPriceRange([0, maxPrice]);
    setDisplayedCount(ITEMS_PER_PAGE);
    setShowOnlyPopular(false);
    setSortBy('name-asc');
  };

  const hasActiveFilters = useMemo(() => {
    return (
      selectedColors.length > 0 ||
      selectedAttributes.length > 0 ||
      selectedFunctionality.length > 0 ||
      searchQuery ||
      priceRange[0] > 0 ||
      priceRange[1] < maxPrice ||
      showOnlyPopular ||
      sortBy !== 'name-asc'
    );
  }, [selectedColors, selectedAttributes, selectedFunctionality, searchQuery, priceRange, maxPrice, showOnlyPopular, sortBy]);

  // Рекомендуемые товары (популярные, максимум 3)
  const recommendedProducts = useMemo(() => {
    return products.filter(p => p.popular).slice(0, 3);
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.catalog}>
        <div className={styles.container}>
          {/* Заголовок */}
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>
              <span className="gradient-text">Каталог</span> румбоксов
            </h1>
            <p>Найдите идеальный миниатюрный мир для себя или в подарок</p>
          </motion.div>

          {/* Основной контент с фильтрами и результатами */}
          <div className={styles.contentWrapper}>
            {/* Боковая панель с фильтрами */}
            <aside className={styles.sidebar}>
              <motion.div
                className={styles.filters}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className={styles.filtersHeader}>
                  <h3 className={styles.filtersTitle}>Фильтры</h3>
                  <button
                    className={styles.collapseButton}
                    onClick={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
                    aria-label={isFiltersCollapsed ? 'Развернуть фильтры' : 'Свернуть фильтры'}
                  >
                    <span className={styles.collapseIcon}>{isFiltersCollapsed ? '▼' : '▲'}</span>
                  </button>
                </div>

                <motion.div
                  initial={false}
                  animate={{ height: isFiltersCollapsed ? 0 : 'auto', opacity: isFiltersCollapsed ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >

                  {/* Поиск */}
                  <div className={styles.filterSection}>
                    <label className={styles.filterLabel} htmlFor="search">Поиск</label>
                    <input
                      id="search"
                      type="text"
                      placeholder="Введите название..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={styles.searchInput}
                    />
                  </div>

                  {/* Сортировка */}
                  <div className={styles.filterSection}>
                    <label className={styles.filterLabel} htmlFor="sort">Сортировка</label>
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className={styles.selectInput}
                    >
                      <option value="name-asc">По названию (А-Я)</option>
                      <option value="name-desc">По названию (Я-А)</option>
                      <option value="price-asc">По цене (возрастание)</option>
                      <option value="price-desc">По цене (убывание)</option>
                      <option value="popular">Популярные</option>
                    </select>
                  </div>

                  {/* Популярные */}
                  <div className={styles.filterSection}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={showOnlyPopular}
                        onChange={(e) => setShowOnlyPopular(e.target.checked)}
                        className={styles.checkboxInput}
                      />
                      <span>Только популярные</span>
                    </label>
                  </div>

                  {/* Цена */}
                  <div className={styles.filterSection}>
                    <label className={styles.filterLabel}>
                      Цена: {priceRange[0]}₽ - {priceRange[1]}₽
                    </label>
                    <div className={styles.priceInputs}>
                      <input
                        type="number"
                        min="0"
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className={styles.numberInput}
                      />
                      <span className={styles.priceSeparator}>—</span>
                      <input
                        type="number"
                        min="0"
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className={styles.numberInput}
                      />
                    </div>
                    <div className={styles.priceRange}>
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className={styles.rangeInput}
                      />
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className={styles.rangeInput}
                      />
                    </div>
                  </div>

                  {/* Цвета */}
                  {/* <div className={styles.filterSection}>
                      <div className={styles.filterSectionHeader}>
                        <label className={styles.filterLabel}>Цвета</label>
                        <button
                          className={styles.collapseSectionButton}
                          onClick={() => setIsColorsCollapsed(!isColorsCollapsed)}
                          aria-label={isColorsCollapsed ? 'Развернуть цвета' : 'Свернуть цвета'}
                        >
                          <span className={styles.collapseIcon}>{isColorsCollapsed ? '▼' : '▲'}</span>
                        </button>
                      </div>
                      <motion.div
                        initial={false}
                        animate={{ height: isColorsCollapsed ? 0 : 'auto', opacity: isColorsCollapsed ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <select
                          multiple
                          value={selectedColors}
                          onChange={(e) => {
                            const values = Array.from(e.target.selectedOptions, option => option.value);
                            setSelectedColors(values);
                          }}
                          className={styles.selectInput}
                          size={Math.min(allColors.length, 5)}
                        >
                          {allColors.map(color => (
                            <option key={color} value={color}>{color}</option>
                          ))}
                        </select>
                        {selectedColors.length > 0 && (
                          <div className={styles.selectedTags}>
                            {selectedColors.map(color => (
                              <span key={color} className={styles.selectedTag}>
                                {color}
                                <button
                                  onClick={() => setSelectedColors(selectedColors.filter(c => c !== color))}
                                  className={styles.removeTag}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </div> */}

                  {/* Атрибуты */}
                  {/* <div className={styles.filterSection}>
                      <div className={styles.filterSectionHeader}>
                        <label className={styles.filterLabel}>Атрибуты</label>
                        <button
                          className={styles.collapseSectionButton}
                          onClick={() => setIsAttributesCollapsed(!isAttributesCollapsed)}
                          aria-label={isAttributesCollapsed ? 'Развернуть атрибуты' : 'Свернуть атрибуты'}
                        >
                          <span className={styles.collapseIcon}>{isAttributesCollapsed ? '▼' : '▲'}</span>
                        </button>
                      </div>
                      <motion.div
                        initial={false}
                        animate={{ height: isAttributesCollapsed ? 0 : 'auto', opacity: isAttributesCollapsed ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <select
                          multiple
                          value={selectedAttributes}
                          onChange={(e) => {
                            const values = Array.from(e.target.selectedOptions, option => option.value);
                            setSelectedAttributes(values);
                          }}
                          className={styles.selectInput}
                          size={Math.min(allAttributes.length, 5)}
                        >
                          {allAttributes.map(attr => (
                            <option key={attr} value={attr}>{attr}</option>
                          ))}
                        </select>
                        {selectedAttributes.length > 0 && (
                          <div className={styles.selectedTags}>
                            {selectedAttributes.map(attr => (
                              <span key={attr} className={styles.selectedTag}>
                                {attr}
                                <button
                                  onClick={() => setSelectedAttributes(selectedAttributes.filter(a => a !== attr))}
                                  className={styles.removeTag}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </div> */}

                  {/* Функционал */}
                  {/* <div className={styles.filterSection}>
                      <div className={styles.filterSectionHeader}>
                        <label className={styles.filterLabel}>Функционал</label>
                        <button
                          className={styles.collapseSectionButton}
                          onClick={() => setIsFunctionalityCollapsed(!isFunctionalityCollapsed)}
                          aria-label={isFunctionalityCollapsed ? 'Развернуть функционал' : 'Свернуть функционал'}
                        >
                          <span className={styles.collapseIcon}>{isFunctionalityCollapsed ? '▼' : '▲'}</span>
                        </button>
                      </div>
                      <motion.div
                        initial={false}
                        animate={{ height: isFunctionalityCollapsed ? 0 : 'auto', opacity: isFunctionalityCollapsed ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <select
                          multiple
                          value={selectedFunctionality}
                          onChange={(e) => {
                            const values = Array.from(e.target.selectedOptions, option => option.value);
                            setSelectedFunctionality(values);
                          }}
                          className={styles.selectInput}
                          size={Math.min(allFunctionality.length, 5)}
                        >
                          {allFunctionality.map(func => (
                            <option key={func} value={func}>{func}</option>
                          ))}
                        </select>
                        {selectedFunctionality.length > 0 && (
                          <div className={styles.selectedTags}>
                            {selectedFunctionality.map(func => (
                              <span key={func} className={styles.selectedTag}>
                                {func}
                                <button
                                  onClick={() => setSelectedFunctionality(selectedFunctionality.filter(f => f !== func))}
                                  className={styles.removeTag}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </div> */}

                  {/* Сброс фильтров */}
                  {hasActiveFilters && (
                    <button
                      className={styles.resetFilters}
                      onClick={handleResetFilters}
                    >
                      Сбросить все фильтры
                    </button>
                  )}
                </motion.div>
              </motion.div>
            </aside>

            {/* Основной контент с результатами */}
            <div className={styles.results}>
              <p className={styles.resultsCount}>
                Найдено товаров: {filteredProducts.length}
              </p>

              <div className={styles.grid}>
                {displayedProducts.map((product, index) => {
                  const originalIndex = products.findIndex(p => p === product);
                  return (
                    <motion.div
                      key={`${product.name}-${index}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      className={styles.planWrapper}
                    >
                      {product.popular && (
                        <div className={styles.badge}>Популярный</div>
                      )}
                      <Card hover glow={product.popular}>
                        <div className={styles.planHeader}>
                          <h3>{product.name}</h3>
                          <div className={styles.price}>
                            <span className={styles.amount}>{product.price}</span>
                            {product.period && <span className={styles.period}>₽ / {product.period}</span>}
                          </div>
                        </div>

                        <ul className={styles.features}>
                          {product.features.slice(0, 4).map((feature, i) => (
                            <li key={i}>
                              <span className={styles.check}>✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <Button
                          variant={product.popular ? 'secondary' : 'outline'}
                          fullWidth
                          onClick={() => handleViewDetails(originalIndex)}
                        >
                          Подробнее
                        </Button>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {hasMore && (
                <motion.div
                  className={styles.showMore}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button variant="outline" size="lg" onClick={handleShowMore}>
                    Показать ещё
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Блок "Может подойти вам" */}
          {recommendedProducts.length > 0 && (
            <motion.div
              className={styles.recommended}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.recommendedTitle}>
                Может <span className="gradient-text">подойти вам</span>
              </h2>
              <div className={styles.recommendedGrid}>
                {recommendedProducts.map((product, index) => {
                  const originalIndex = products.findIndex(p => p === product);
                  return (
                    <motion.div
                      key={`recommended-${product.name}-${index}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      className={styles.planWrapper}
                    >
                      {product.popular && (
                        <div className={styles.badge}>Популярный</div>
                      )}
                      <Card hover glow={product.popular}>
                        <div className={styles.planHeader}>
                          <h3>{product.name}</h3>
                          <div className={styles.price}>
                            <span className={styles.amount}>{product.price}</span>
                            {product.period && <span className={styles.period}>₽ / {product.period}</span>}
                          </div>
                        </div>

                        <ul className={styles.features}>
                          {product.features.slice(0, 3).map((feature, i) => (
                            <li key={i}>
                              <span className={styles.check}>✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <Button
                          variant={product.popular ? 'secondary' : 'outline'}
                          fullWidth
                          onClick={() => handleViewDetails(originalIndex)}
                        >
                          Подробнее
                        </Button>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </section>
      <ContactModalForm isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default CatalogPage;

