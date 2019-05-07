json.(@message, :content, :image)
json.created_at @message.created_at.strftime("%Y/%m/%d(#{%w(Sun Mon Tue Wed Thu Fri Sat)[Time.now.wday]}) %H:%M:%S")
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id
