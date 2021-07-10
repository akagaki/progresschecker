@extends('layouts.app')

@section('title', 'Index')

@section('menubar',)
     チーム一覧
     
@endsection

@section('content')
    <button> <a href='team/add'>新規チーム作成</a></button>
    <button> <a href='team/find'>検索</a></button>
   @foreach ($items as $item)
   <table>
   <tr><th>チーム名</th><th>詳細</th><th>作成者</th><th></th><th></th><th></th></tr>
   
       <tr>
           <td>{{$item->name}}</td>
           <td>{{$item->information}}</td>
           <td>{{$item->ownerName()}}</td>
           <td><button> <a href='/team/edit?id={{$item->id}}'>編集</a></button></td>
           <td><button> <a href='/team/del?id={{$item->id}}'>削除</a></button></td>
           <td><button><a href='project/add?id={{$item->id}}''>新規プロジェクト作成</a></button></td>

       </tr>
            @if ($item->projects != null)
            <tr>
                <th>プロジェクト名</th><th>詳細</th><th>作成者</th><th></th><th></th><th></th>
            </tr>
                @foreach ($item->projects as $obj)
                    <tr>
                        <td>{{$obj->name}}</td>
                        <td>{{$obj->information}}</td>
                        <td>{{$obj->ownerName()}}</td>
                        <td><button> <a href='/project/edit?id={{$obj->id}}'>編集</a></button></td>
                        <td><button> <a href='/project/del?id={{$obj->id}}'>削除</a></button></td>
                    </tr>
                @endforeach    
            @endif
    </table>
    <supace>　</supace>
   @endforeach

@endsection

@section('footer')
copyright 2021 akagaki.
@endsection