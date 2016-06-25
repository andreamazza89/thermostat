require 'sinatra/base'
require 'json'

class Thermostat < Sinatra::Base

  enable :sessions

  get '/' do
    erb :index
  end

  get '/temperature' do

      temperature = session[:count].to_s || 20.to_s
      content_type :json
      { temperature: temperature }.to_json

  end

  post '/temperature/:new_temperature' do
    p params 
    session[:current_temperature] = params[:new_temperature]
  end

  post '/power_saving_mode' do
    @current_psm = session[:current_temperature]
  end

end
