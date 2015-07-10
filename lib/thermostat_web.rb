require 'sinatra/base'

class ThermostatWeb < Sinatra::Base

  enable :sessions

  set :views, proc { File.join(root, '..', 'views') }
  set :public_folder, proc { File.join(root, '..', 'public') }


  get '/' do
    erb :'index'
  end

  post '/start' do
    session[:temperature] = params[:temp]
  end

  get '/temp' do
    "#{session[:temperature] || 20}"
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
