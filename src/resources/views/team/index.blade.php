@extends('layouts.helloapp')

@section('title', 'Index')

@section('menubar',)
   チーム一覧
@endsection

@section('content')
   @foreach ($items as $item)
   <table>
   <tr><th>チーム名</th><th>詳細</th><th>作成者</th><th>編集</th><th>削除</th></tr>
   
       <tr>
           <td>{{$item->name}}</td>
           <td>{{$item->information}}</td>
           <td>{{$item->user_id}}</td>
           <td><button> <a href='/team/edit?id={{$item->id}}'>編集</a></button></td>
           <td><button> <a href='/team/del?id={{$item->id}}'>削除</a></button></td>
       </tr>
       <tr>
            <tr>
                <th>プロジェクト名</th>
                <th><a href='project/add?id={{$item->id}}''>新規プロジェクト作成</a></th>
            </tr>
            <td>
            @if ($item->projects != null)
                @foreach ($item->projects as $obj)
                    <tr><td>{{$obj->getData()}}</td></tr>
                @endforeach
            @endif
            </td>
       </tr>
    </table>
   @endforeach
  <button> <a href='team/add'>新規チーム作成</a></button>
  <button> <a href='team/find'>検索</a></button>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection