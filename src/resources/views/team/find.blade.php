@extends('layouts.app')

@section('title', 'Person.find')

@section('menubar')
   チーム名検索
@endsection

@section('content')
   <form action="/team/find" method="post">
   @csrf
   <input type="text" name="input" value="{{$input}}">
   <input type="submit" value="find">
   </form>
   @if (isset($item))
   <table>
   <tr><th>Data</th></tr>
   <tr>
      <td>{{$item->getData()}}</td>
   </tr>
   </table>
   @endif
   <button> <a href='/team'>戻る</a></button>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection