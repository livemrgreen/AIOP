class ModsController < ApplicationController
	def index
		mods = Mod.all
		if mods
			render json: mods, root: "modules", status: 200
		else
			render json: nil, status: 400
		end
	end

	def show
		mod = Mod.find_by(id: params[:id])
		if mod
			render json: mod, root: "module", status: 200
		else
			render json: nil, status: 400
		end
	end
end
