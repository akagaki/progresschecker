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
   <form action="/task/edit" method="post">
   <table>
      @csrf
      <input type="hidden" name="id" value="{{$form->id}}">
      <input type="hidden" name="user_id" value="{{$form->user_id}}">
      <input type="hidden" name="project_id" value="{{$form->project_id}}">
      <tr><th>タスク名: </th><td><input type="text" name="name" 
         value="{{$form->name}}"></td></tr>
      <tr><th>詳細: </th><td><input type="text" name="information" 
         value="{{$form->information}}"></td></tr>
      <tr><th>進捗: </th><td>
         <!-- <input type="text" name="progress" value="{{$form->progress}}"></td></tr> -->
         <select name="progress">
            <option value="{{$form->progress}}"></option>
            <option value=0>未対応</option>
            <option value=1>対応中</option>
            <option value=2>対応済</option>
            <option value=3>完了</option>
         </select>
      <tr><th>期日: </th><td><input type="date" name="deadline" 
         value="{{$form->deadline}}"></td></tr>
      <tr><th></th><td><input type="submit" 
         value="send"></td></tr>
   </table>
   <button> <a href='/task/show?id={{$form->id}}'>戻る</a></button>
   </form>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection