@extends('layouts.helloapp')

@section('title', 'Index')

@section('menubar',)
   チーム一覧
@endsection

@section('content')
   <table>
   <tr><th>チーム名</th><th>詳細</th></tr>
   @foreach ($items as $item)
       <tr>
           <td>{{$item->name}}</td>
           <td>{{$item->information}}</td>
       </tr>
   @endforeach
   </table>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection