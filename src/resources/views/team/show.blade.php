@extends('layouts.helloapp')

@section('title', 'Show')

@section('menubar')
   詳細ページ
@endsection

@section('content')
   @if ($items != null)
       @foreach($items as $item)
       <table width="400px">
       <tr><th width="50px">id:</th>
       <td width="50px">{{$item->id}}</td>
       <th width="50px">name:</th>
       <td>{{$item->name}}</td></tr>
       </table>
       @endforeach
   @endif

   <button> <a href='/team'>戻る</a></button>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection