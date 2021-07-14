<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <style>
    main {background-color: #f5f5f5;}
    body {font-size:16pt; color:#383c3c; margin: 5px; }
    .menutitle {font-size:14pt; font-weight:bold; margin: 10px; padding: 20px; }
    .content {margin:10px; }
    .footer { text-align:right; font-size:10pt; margin:10px;
        border-bottom:solid 1px #ccc; color:#ccc; }
    .items{float: right; padding-right: 40px;}
    .team-box {
        padding: 20px;margin: 20px 10px; 
        background-color: white; box-shadow: 2px 2px 4px gray;border-radius: 1%;
    }
    /* mein */
    .main-conteiner{display: flex; border-bottom:solid 1px #ccc; 
    margin-bottom: 10px;
    }
    .main-information{
        font-weight:bold; padding: 10px 0; 
    }
    .member-information { 
        font-weight:bold; padding: 10px; margin: 0 20px; border-left:solid 1px #ccc;
    }
    .member-add { margin: 20px 0;}
    .main-items{ margin: 10px 20px; float: right;}
    /* sub */
    .sub-information p{ 
        align-items: center;
        margin: auto 0;
    }
    .sub-information {
        border-bottom:solid 1px #ccc; 
        padding: 10px 0; margin: 10px 0;

    }
    .task-box {
        display: flex;
        width: 100%;
        padding-bottom: 10px;
        border-bottom:solid 1px #ccc;
    }
    .card-container {
        flex: 1;
        margin: 0 10px;
        padding: 10px;
        text-align: center;
        background-color:#5f9ea0;
        color: whitesmoke;
        box-shadow: 2px 2px 4px gray;
        border-radius: 2%
    }
    .card-item {
        width: 100%;
        height: auto;
        margin: 10px auto;
        padding: 10px;
        text-align: left;
        background-color: #ffff;
        font-size: 10px;
        border-radius: 2%;
    }
    </style>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title')</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="{{ url('home') }}">
                    {{ config('app.name') }}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            @if (Route::has('login'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('login') }}">{{ __('ログイン') }}</a>
                                </li>
                            @endif

                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('新規登録') }}</a>
                                </li>
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }}
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4">
            <div class="menutitle">
            @yield('menubar')
            </div>
            <div class="content">
            @yield('content')
            </div>
            <div class="footer">
            @yield('footer')
            </div>
        </main>
    </div>
</body>
</html>