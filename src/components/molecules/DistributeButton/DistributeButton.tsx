'use client';

import { FaHandPaper } from 'react-icons/fa';
import { AppConst } from '@/common/AppConst';
import { CardProps } from '@/types/Card';
import { DistributeButtonProps } from '@/types/DistributeButton';
import { useGenre } from '@/context/Genre';
import { buttonBaseStyle } from '@/components/molecules/DistributeButton/DistributeButton.css';

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * カード配布ボタン
 */
export const DistributeButton = (props: DistributeButtonProps) => {
  const { genre } = useGenre();

  const distributeCards = () => {
    if (props.deck.length === 0) {
      console.error('山札が空です。');
      return;
    }

    // ジャンルでフィルタリングして山札を生成
    const filteredDeck = props.originalDeck.filter((card) => card.genre === genre);
    const shuffledDeck = props.getRandomCards(filteredDeck, AppConst.DECK_COUNT);

    // ゲームに必要なカード枚数のチェックと配布処理
    const requiredCards = props.playerCount * AppConst.INITIAL_CARDS_PER_PLAYER + 1;
    if (shuffledDeck.length < requiredCards) {
      console.error('山札に十分なカードがありません。');
      return;
    }

    // プレイヤーごとにカードを配布し、場に出すカードを設定
    const playerCards: CardProps[][] = Array.from({ length: props.playerCount }, () => []);
    for (let i = 0; i < AppConst.INITIAL_CARDS_PER_PLAYER; i++) {
      for (let j = 0; j < props.playerCount; j++) {
        const cardToDistribute = shuffledDeck.pop();
        if (cardToDistribute) {
          playerCards[j].push(cardToDistribute);
        } else {
          console.error('山札に十分なカードがありません。');
          return;
        }
      }
    }

    const tableCard = shuffledDeck.pop();
    if (tableCard) {
      props.onDistribute(playerCards, tableCard);
      props.setDeck(shuffledDeck);
      props.setCurrentTurn(0);
    } else {
      console.error('山札に十分なカードがありません。');
    }

    const allPlayedCardIds = [
      ...props.tableCards.map((card) => card.id),
      ...props.playerCards.flat().map((card) => card.id),
    ];
    const hideAllYears = allPlayedCardIds.reduce((acc, id) => {
      acc[id] = false;
      return acc;
    }, {} as { [key: number]: boolean });

    props.setShowYears(hideAllYears);
    props.setShowMessage(false);
  };

  return (
    <button onClick={distributeCards} className={buttonBaseStyle}>
      <FaHandPaper size={24} /> カード配布
    </button>
  );
};

export default DistributeButton;
