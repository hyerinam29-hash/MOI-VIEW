import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json({ error: '이미지 파일이 없습니다.' }, { status: 400 });
    }

    // 우선순위: remove.bg -> Clipdrop
    const removeBgKey = process.env.REMOVE_BG_API_KEY;
    const clipdropKey = process.env.CLIPDROP_API_KEY;

    const buffer = Buffer.from(await imageFile.arrayBuffer());

    if (removeBgKey) {
      console.log('Using remove.bg API');
      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': removeBgKey,
        },
        body: createRemoveBgFormData(buffer),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json({ error: 'remove.bg API 오류', details: errorData }, { status: response.status });
      }

      const resultBlob = await response.blob();
      return new NextResponse(resultBlob, {
        headers: {
          'Content-Type': 'image/png',
        },
      });
    } else if (clipdropKey) {
      console.log('Using Clipdrop API');
      const apiFormData = new FormData();
      apiFormData.append('image_file', new Blob([new Uint8Array(buffer)], { type: imageFile.type }));

      const response = await fetch('https://clipdrop-api.co/remove-background/v1', {
        method: 'POST',
        headers: {
          'x-api-key': clipdropKey,
        },
        body: apiFormData,
      });

      if (!response.ok) {
        return NextResponse.json({ error: 'Clipdrop API 오류' }, { status: response.status });
      }

      const resultBlob = await response.blob();
      return new NextResponse(resultBlob, {
        headers: {
          'Content-Type': 'image/png',
        },
      });
    } else {
      return NextResponse.json({ error: 'API 키가 설정되지 않았습니다. .env.local 파일을 확인해주세요.' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Background removal error:', error);
    return NextResponse.json({ error: '배경 제거 중 오류가 발생했습니다.', message: error.message }, { status: 500 });
  }
}

function createRemoveBgFormData(buffer: Buffer) {
  const formData = new FormData();
  formData.append('size', 'auto');
  // Use Uint8Array to satisfy BlobPart type in some environments
  formData.append('image_file', new Blob([new Uint8Array(buffer)], { type: 'image/png' }), 'image.png');
  return formData;
}
