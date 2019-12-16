json.user_name @message.user.name
json.created_at @message.created_at
json.content @message.content
json.image @message.image.url

# message.user.name
# message.created_at.strftime("%Y/%m/%d %H:%M")
# message.content
# message.image.url