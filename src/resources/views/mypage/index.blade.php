@extends('layouts.app')

@section('title', 'Myページ')

@section('menubar')
Myページ
   <div class="items">
      <a href='/home'><i class="fa fa-reply"></i>	</a>
   </div>
@endsection

@section('content')
<div id='index'></div>
<div id='board'></div>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection