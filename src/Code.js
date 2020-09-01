function sendToSlack(body, channel) {
  var url = 'https://hooks.slack.com/services/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';
  var data = { "channel" : channel, "username" : "test-book", "text" : body, "icon_emoji" : "：https://applech2.com/wp-content/uploads/2016/03/emoji-logo-icon.jpg：" };
  var payload = JSON.stringify(data);
  var options = {
    "method" : "POST",
    "contentType" : "application/json",
    "payload" : payload
  };
  var response = UrlFetchApp.fetch(url, options);
}

function test() {
  sendToSlack("<!here> テスト通知確認です", "#pre-slack-bot");
}

function onFormSubmit(e){
  var applicant = "";
  var itemResponse = e.response.getItemResponses();

  for (var j = 0; j < itemResponse.length; j++){    
    var formData = itemResponse[j];
    var title = formData.getItem().getTitle();
    var response = formData.getResponse();

    switch (title) {
      case "メールアドレス":
        email = response;
        break;
      case "読みたい本のタイトル":
        bookTitle = response;
        break;
      case "AmazonURL":
        amazon = response;
        break;
      case "本の簡単な詳細":
        description = response;
        break;
      case "読みたい理由":
        reason = response;
        break;
      default:
        break;
    }
  }
  var bodyPublic = "\n読みたい本のタイトル:"　+ bookTitle + "\nAmazonURL:" + amazon + "\n本の簡単な詳細: " + description + "\n読みたい理由: " + reason
  sendToSlack(bodyPublic, "#pre-slack-bot");
}
