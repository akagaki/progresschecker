@extends('layouts.app')

@section('title', 'Edit')

@section('menubar')
   更新ページ
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
   <form action="/team/edit" method="post">
   <table>
      @csrf
      <input type="hidden" name="id" value="{{$form->id}}">
      <input type="hidden" name="user_id" value="{{$form->user_id}}">
      <tr><th>チーム名: </th><td><input type="text" name="name" 
         value="{{$form->name}}"></td></tr>
      <tr><th>詳細: </th><td><input type="text" name="information" 
         value="{{$form->information}}"></td></tr>
      <tr><th></th><td><input type="submit" 
         value="send"></td></tr>
   </table>
   <button> <a href='/team/show?id={{$form->id}}'>戻る</a></button>
   </form>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection