# frozen_string_literal: true

require 'sinatra'
require 'sinatra/cors'
require 'json'

before do
  content_type :json
end

set :allow_origin, 'http://localhost:3000'
set :allow_methods, 'GET,HEAD,POST,OPTIONS'
set :allow_headers, 'content-type,if-modified-since,Authorization,Accept'
set :expose_headers, 'location,link'

get '/' do
  puts 'from root'
end

get '/wallet' do
  puts 'from wallet'
end

# Ваш маршрут для обработки запроса авторизации
post '/admin/auth/login' do
  # Здесь ваш код обработки запроса
  # Например, проверка учетных данных и генерация токена авторизации
  # data = JSON.parse request.body.read
  # redirect '/admin/users', 200
  # Отправляем ответ

  status 200
  { token: 'some_token' }.to_json
end

get '/admin/auth/check-auth' do
  # token = request.envlogin['HTTP_AUTHORIZATION'].split.last

  { auth: true }.to_json
end

get '/admin/auth/get-identity' do
  user_data = { email: 'admin@dev.family',
                id: 1,
                name: 'Dev Family',
                password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
                role: 'admin' }
  { user: { **user_data } }.to_json
end

post '/admin/auth/logout' do
  { message: 'logout' }.to_json
end

get '/admin/users' do
  # параменров может и не быть
  # query params
  # {
  #   'page' => '1',
  #   'perPage' => '10',
  #   'sort' => {
  #     'field' => 'sort',
  #     'order' => {
  #       'created_at' => 'desc' | 'asc'
  #       'amount_payments' => 'desc' | 'asc'
  #     }
  #   },
  #   'filter' => {
  #     'utms' => '2',
  #     'products' => '3'
  #   }
  # }

  current = params['page']
  page_size = params['perPage']

  # поиск пользователей с учётом пришедших фильтров
  # "filter"=>{"utms"=>"из списка передаваемых ид", "products"=>"из списка передаваемых ид"}}
  # /admin/users/filters
  items = (1..30).to_a.map do |id|
    {
      id: id,
      created_at: "строка из бэка #{id}",
      username: "username#{id}",
      amount_payments: "строка от бэка #{id}",
      last_utm: "последняя UTM, по которой переходил пользователь #{id}",
      utms: (1..5).to_a.map { |utm_id| { id: utm_id, name: "name #{utm_id}" } },
      products: (1..5).to_a.map { |product_id| { id: product_id, name: "name #{product_id}" } }
    }
  end

  # items.reverse! if params['sort']['order']['created_at'] == 'desc'

  meta = {
    current: current,
    total: items.count,
    page_size: page_size
  }
  { items: items, meta: meta }.to_json
end

get '/admin/statistics' do
  {
    tgAccountsTotal: 1000,
    tgAccountsActive: 500,
    tgAccountsNew: { perDay: 50, perWeek: 100, perMonth: 400 },
    purchaseAmount: { perDay: 500, perWeek: 1000, perMonth: 4000 },
    utms: [
      { name: 'qqqfasfdafsd asdffasdfasd', perDay: 10, perWeek: 100, perMonth: 400 },
      { name: 'vbcxvcxxvc agfdgdf', perDay: 10, perWeek: 100, perMonth: 400 },
      { name: 'qqqfasfdafsd asdffewioj', perDay: 10, perWeek: 100, perMonth: 400 },
      { name: 'xcvzxc asdffasdfasd', perDay: 10, perWeek: 100, perMonth: 400 }
    ]
  }.to_json
end

post '/admin/send_tg_message' do
  { errors: {
      text: %w[asdf asfd],
      sendTime: ['asdf'],
      fileList: ['afsd']
    },
    message: 'Ошибки валидации' }.to_json

  # {
  #   message: 'Успешно отправлено'
  # }.to_json
end

get '/admin/users/filters' do
  { options: {
    utms: [
      { label: 'utm1', value: 1 },
      { label: 'utm2', value: 2 },
      { label: 'utm3', value: 3 },
      { label: 'utm4', value: 4 }
    ],
    products: [
      { label: 'Продукт 1', value: 1 },
      { label: 'Продукт 2', value: 2 },
      { label: 'Продукт 3', value: 3 },
      { label: 'Продукт 4', value: 4 }
    ]
  } }.to_json
end

get '/admin/tg_channels' do
  items = (1..5).to_a.map do |tg_channel_id|
    {
      id: tg_channel_id,
      name: "tg_channel_name #{tg_channel_id}",
      description: (0..(rand 30)).to_a.map { |_i| ' description' }.join,
      price: 'строка от бэка',
      active: [true, false].sample
    }
  end
  meta = {
    # current:,
    # total: items.count,
    # page_size:
  }
  { items: items, meta: meta }.to_json
end

post '/admin/tg_channels/:channel_id' do
  channel_id = params['channel_id']
  data = JSON.parse(request.body.read)
  data.to_json
end
