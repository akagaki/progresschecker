@extends('layouts.helloapp')

@section('title', 'Add')

@section('menubar',)
   新規作成
@endsection

@section('content')
   @if (count($errors) > 0)
   <div>
       <ul>
           @foreach ($errors->all() as $error)
               <li>{{ $error }}</li>
           @endforeach
       </ul>
   </div>
   @endif
   <form action="/team/add" method="post">
   <table>
       @csrf
       <tr><th>チーム名: </th><td><input type="text" name="name"
           value="{{old('name')}}"></td></tr>
       <tr><th>詳細: </th><td><input type="text" name="information"
           value="{{old('information')}}"></td></tr>
       <tr><th>作成者: </th><td><input type="text" name="user_id"
           value="{{old('user_id')}}"></td></tr>
       <tr><th></th><td><input type="submit" 
           value="send"></td></tr>
   </table>
   </form>
   <button> <a href='/team'>戻る</a></button>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection