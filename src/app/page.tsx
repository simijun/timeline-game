import { fetchOriginalDeck } from '@/utils/fetchOriginalDeck';
import { TimeLineGame } from '@/components/templates/TimeLineGame/TimelineGame';
import { CardProps } from '@/types/Card';

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * トップページ
 */
export default async function Index() {
  const originalDeck: CardProps[] = await fetchOriginalDeck();

  return <TimeLineGame originalDeck={originalDeck} />;
}
