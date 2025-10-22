import { NextRequest, NextResponse } from 'next/server';

/**
 * 将来の共有機能用APIルート（スケルトン）
 *
 * 使用例:
 * - POST /api/result - 結果を保存してIDを発行
 * - GET /api/result?id=xxx - IDから結果を取得
 */

export async function POST(request: NextRequest) {
  try {
    // 将来の実装のためにリクエストボディを読み取る
    await request.json();

    // TODO: データベースに保存する実装を追加
    // const result = await saveResultToDatabase(body);

    return NextResponse.json(
      {
        message: 'Not implemented yet',
        note: '将来のサーバー機能用スケルトン',
      },
      { status: 501 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing id parameter' },
        { status: 400 }
      );
    }

    // TODO: データベースから取得する実装を追加
    // const result = await getResultFromDatabase(id);

    return NextResponse.json(
      {
        message: 'Not implemented yet',
        note: '将来のサーバー機能用スケルトン',
      },
      { status: 501 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
