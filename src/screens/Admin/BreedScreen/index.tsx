import { ScrollView, Text, View } from 'react-native';
import { Button, CheckBox } from '@rneui/base';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLazyGetCatBreedIdsQuery } from '../../../api/endpoints/CatsApi';
import * as S from './styles';
import { ScreenNavigationProp, ScreenRouteProp } from '../../../../App';
import { useAppDispatch } from '../../../store/Hooks';
import { setBreeds } from '../../../store/slice/Breeds';
import { CatBreedNameId } from '../../../model/CatBreed';

interface BreedScreenProps {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

interface BreedItem {
  breed: CatBreedNameId;
  selected: boolean;
}

const BreedScreen: React.FC<BreedScreenProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const [getCatBreedIds, { currentData: catBreeds }] =
    useLazyGetCatBreedIdsQuery();
  const [breedItems, setBreedItems] = useState<BreedItem[]>([]);

  useEffect(() => {
    getCatBreedIds();
  }, []);

  useEffect(() => {
    //tipo novo de objeto para mostrar se raca esta selecionada ou nao
    if (catBreeds && catBreeds?.length > 0) {
      const items = catBreeds.map(breed => {
        return {
          breed,
          selected: true,
        } as BreedItem;
      });
      setBreedItems(items);
    }
  }, [catBreeds]);

  const onPressBreed = useCallback(
    //useCallback para memoizacao e aumento de performance
    //altera a lista para refletir selecionado
    (selectedBreed: BreedItem) => {
      const newItems = breedItems.map(item => {
        if (item.breed.id == selectedBreed.breed.id) {
          return {
            ...item,
            selected: !selectedBreed.selected,
          } as BreedItem;
        }
        return item;
      });
      setBreedItems(newItems);
    },
    [breedItems],
  );

  const selectAll = () => {
    //altera a lista para todos ficarem com selected verdadeiro
    const newItems = breedItems.map(item => {
      return {
        ...item,
        selected: true,
      } as BreedItem;
    });
    setBreedItems(newItems);
  };

  const selectNone = () => {
    //altera a lista para todos ficarem com selected falso
    const newItems = breedItems.map(item => {
      return {
        ...item,
        selected: false,
      } as BreedItem;
    });
    setBreedItems(newItems);
  };

  const onConfirmSelection = () => {
    //confirmando a selecao e voltando para a tela anterior
    const breeds = breedItems.map(item => item.breed);
    dispatch(setBreeds(breeds));
    navigation.goBack();
  };

  return (
    <S.Container>
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <S.TopContainer>
          <S.Title>Raças</S.Title>
          <S.ButtonsContainer>
            <Button size="md" onPress={selectAll}>
              Selecionar todos
            </Button>
            <Button size="md" onPress={selectNone}>
              Resetar selecionados
            </Button>
          </S.ButtonsContainer>
          <Button size="md" onPress={onConfirmSelection}>
            Confirmar seleção
          </Button>
        </S.TopContainer>

        {breedItems.map(item => (
          <CheckBox
            checked={item.selected}
            containerStyle={{
              flex: 0,
              borderRadius: 10,
            }}
            onIconPress={() => onPressBreed(item)}
            onPress={() => onPressBreed(item)}
            size={20}
            title={item.breed.name}
            key={item.breed.name}
          />
        ))}
      </ScrollView>
    </S.Container>
  );
};

export default BreedScreen;
