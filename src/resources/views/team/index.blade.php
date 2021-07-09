@extends('layouts.helloapp')

@section('title', 'Index')

@section('menubar',)
   チーム一覧
@endsection

@section('content')
   <table>
   <tr><th>チーム名</th><th>詳細</th><th>作成者</th><th>編集</th><th>削除</th></tr>
   @foreach ($items as $item)
       <tr>
           <td>{{$item->name}}</td>
           <td>{{$item->information}}</td>
           <td>{{$item->user_id}}</td>
           
           <td><button> <a href='/team/edit?id={{$item->id}}'>編集</a></button></td>
           <td><button> <a href='/team/del?id={{$item->id}}'>削除</a></button></td>
       </tr>
   @endforeach
   </table>
  <button> <a href='team/add'>新規チーム作成</a></button>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection