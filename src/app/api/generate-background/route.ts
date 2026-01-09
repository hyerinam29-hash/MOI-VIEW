import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: '프롬프트를 입력해주세요.' }, { status: 400 });
    }

    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
      // API 키가 없는 경우 더미 데이터 반환 (데모용)
      console.warn('UNSPLASH_ACCESS_KEY is not set. Returning demo images.');
      const demoImages = [
        { id: 'custom_1', label: `${prompt} (Demo 1)`, src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80' },
        { id: 'custom_2', label: `${prompt} (Demo 2)`, src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80' }
      ];
      return NextResponse.json({ results: demoImages });
    }

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(prompt)}&per_page=4&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Unsplash API 오류' }, { status: response.status });
    }

    const data = await response.json();
    const results = data.results.map((img: any) => ({
      id: img.id,
      label: img.description || img.alt_description || prompt,
      src: img.urls.regular,
    }));

    return NextResponse.json({ results });
  } catch (error: any) {
    console.error('Background generation error:', error);
    return NextResponse.json({ error: '배경 생성 중 오류가 발생했습니다.', message: error.message }, { status: 500 });
  }
}
