class Api::MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.where("id > #{params[:id]}").where(group_id: @group)
    respond_to do |format|
      format.html
      format.json
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
