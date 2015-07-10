require 'sinatra/base'

class ThermostatWeb < Sinatra::Base

  set :views, proc { File.join(root, '..', 'views') }
  set :public_folder, proc { File.join(root, '..', 'public') }


  get '/' do
    erb :'thermostat'
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
